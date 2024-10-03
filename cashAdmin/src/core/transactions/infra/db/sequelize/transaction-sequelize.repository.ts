import { Op, literal } from "sequelize";
import { Transaction, TransactionId } from "../../../domain/transaction.aggregate";
import {
  TransactionSearchParams,
  TransactionSearchResult,
  ITransactionRepository,
} from "../../../domain/transaction.repository";
import { TransactionModel } from "./transaction.model";
import { TransactionModelMapper } from "./transaction-model-mapper";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { InvalidArgumentError } from "../../../../shared/domain/errors/invalid-argument.error";

export class TransactionSequelizeRepository implements ITransactionRepository {
  sortableFields: string[] = ["name", "created_at"];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`), //ascii
    },
  };

  constructor(private transactionModel: typeof TransactionModel) {}

  async insert(entity: Transaction): Promise<void> {
    const modelProps = TransactionModelMapper.toModel(entity);
    await this.transactionModel.create(modelProps.toJSON());
  }

  async bulkInsert(entities: Transaction[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      TransactionModelMapper.toModel(entity).toJSON()
    );
    await this.transactionModel.bulkCreate(modelsProps);
  }

  async update(entity: Transaction): Promise<void> {
    const id = entity?.transaction_id?.id;

    const modelProps = TransactionModelMapper.toModel(entity);
    const [affectedRows] = await this.transactionModel.update(modelProps.toJSON(), {
      where: { transaction_id: entity?.transaction_id?.id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async delete(transaction_id: TransactionId): Promise<void> {
    const id = transaction_id.id;

    const affectedRows = await this.transactionModel.destroy({
      where: { transaction_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findByIds(ids: TransactionId[]): Promise<Transaction[]> {
    const models = await this.transactionModel.findAll({
      where: {
        transaction_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => TransactionModelMapper.toEntity(m));
  }

  async existsById(
    ids: TransactionId[]
  ): Promise<{ exists: TransactionId[]; not_exists: TransactionId[] }> {
    if (!ids.length) {
      throw new InvalidArgumentError(
        "ids must be an array with at least one element"
      );
    }

    const existsTransactionModels = await this.transactionModel.findAll({
      attributes: ["transaction_id"],
      where: {
        transaction_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    const existsTransactionIds = existsTransactionModels.map(
      (m) => new TransactionId(m.transaction_id)
    );
    const notExistsTransactionIds = ids.filter(
      (id) => !existsTransactionIds.some((e) => e.equals(id))
    );
    return {
      exists: existsTransactionIds,
      not_exists: notExistsTransactionIds,
    };
  }

  async findById(entity_id: TransactionId): Promise<Transaction | null> {
    const model = await this.transactionModel.findByPk(entity_id.id);

    return model ? TransactionModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Transaction[]> {
    const models = await this.transactionModel.findAll();
    return models.map((model) => {
      return TransactionModelMapper.toEntity(model);
    });
  }

  async search(props: TransactionSearchParams): Promise<TransactionSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const whereClause: any = {};

    if (props.filter) {
      const filterNumber = parseFloat(props.filter);
      if (!isNaN(filterNumber)) {
        whereClause.balance = filterNumber;
      }
    }

    const { rows: models, count } = await this.transactionModel.findAndCountAll({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [["created_at", "desc"]] }),
      offset,
      limit,
    });

    return new TransactionSearchResult({
      items: models.map((model) => {
        return TransactionModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.transactionModel.sequelize!.getDialect() as "mysql";
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => Transaction {
    return Transaction;
  }
}
