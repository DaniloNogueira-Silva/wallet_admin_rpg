import { Op, literal } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Wallet, WalletId } from "../../../domain/wallet.aggregate";
import {
  WalletSearchParams,
  WalletSearchResult,
  IWalletRepository,
} from "../../../domain/wallet.repository";
import { WalletModel } from "./wallet.model";
import { WalletModelMapper } from "./wallet-model-mapper";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { InvalidArgumentError } from "../../../../shared/domain/errors/invalid-argument.error";

export class WalletSequelizeRepository implements IWalletRepository {
  sortableFields: string[] = ["name", "created_at"];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`), //ascii
    },
  };

  constructor(private walletModel: typeof WalletModel) {}

  async insert(entity: Wallet): Promise<void> {
    const modelProps = WalletModelMapper.toModel(entity);
    await this.walletModel.create(modelProps.toJSON());
  }

  async bulkInsert(entities: Wallet[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      WalletModelMapper.toModel(entity).toJSON()
    );
    await this.walletModel.bulkCreate(modelsProps);
  }

  async update(entity: Wallet): Promise<void> {
    const id = entity.wallet_id.id;

    const modelProps = WalletModelMapper.toModel(entity);
    const [affectedRows] = await this.walletModel.update(modelProps.toJSON(), {
      where: { wallet_id: entity.wallet_id.id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async delete(wallet_id: WalletId): Promise<void> {
    const id = wallet_id.id;

    const affectedRows = await this.walletModel.destroy({
      where: { wallet_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findByIds(ids: WalletId[]): Promise<Wallet[]> {
    const models = await this.walletModel.findAll({
      where: {
        wallet_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => WalletModelMapper.toEntity(m));
  }

  async existsById(
    ids: WalletId[]
  ): Promise<{ exists: WalletId[]; not_exists: WalletId[] }> {
    if (!ids.length) {
      throw new InvalidArgumentError(
        "ids must be an array with at least one element"
      );
    }

    const existsWalletModels = await this.walletModel.findAll({
      attributes: ["wallet_id"],
      where: {
        wallet_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    const existsWalletIds = existsWalletModels.map(
      (m) => new WalletId(m.wallet_id)
    );
    const notExistsWalletIds = ids.filter(
      (id) => !existsWalletIds.some((e) => e.equals(id))
    );
    return {
      exists: existsWalletIds,
      not_exists: notExistsWalletIds,
    };
  }

  async findById(entity_id: WalletId): Promise<Wallet | null> {
    const model = await this.walletModel.findByPk(entity_id.id);

    return model ? WalletModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Wallet[]> {
    const models = await this.walletModel.findAll();
    return models.map((model) => {
      return WalletModelMapper.toEntity(model);
    });
  }

  async search(props: WalletSearchParams): Promise<WalletSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const whereClause: any = {};

    if (props.filter) {
      const filterNumber = parseFloat(props.filter);
      if (!isNaN(filterNumber)) {
        whereClause.balance = filterNumber;
      }
    }

    const { rows: models, count } = await this.walletModel.findAndCountAll({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [["created_at", "desc"]] }),
      offset,
      limit,
    });

    return new WalletSearchResult({
      items: models.map((model) => {
        return WalletModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.walletModel.sequelize!.getDialect() as "mysql";
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => Wallet {
    return Wallet;
  }
}
