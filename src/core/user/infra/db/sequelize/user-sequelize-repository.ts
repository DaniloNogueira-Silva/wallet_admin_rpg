import { Op, literal } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { User, UserId } from "../../../domain/user.aggregate";
import {
  UserSearchParams,
  UserSearchResult,
  IUserRepository,
} from "../../../domain/user.repository";
import { UserModel } from "./user.model";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { InvalidArgumentError } from "../../../../shared/domain/errors/invalid-argument.error";
import { UserModelMapper } from "./user-model-mapper";

export class UserSequelizeRepository implements IUserRepository {
  sortableFields: string[] = ["name", "created_at"];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`), //ascii
    },
  };

  constructor(private userModel: typeof UserModel) {}

  async insert(entity: User): Promise<void> {
    const modelProps = UserModelMapper.toModel(entity);
    await this.userModel.create(modelProps.toJSON());
  }

  async bulkInsert(entities: User[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      UserModelMapper.toModel(entity).toJSON()
    );
    await this.userModel.bulkCreate(modelsProps);
  }

  async update(entity: User): Promise<void> {
    const id = entity.user_id.id;

    const modelProps = UserModelMapper.toModel(entity);
    const [affectedRows] = await this.userModel.update(modelProps.toJSON(), {
      where: { user_id: entity.user_id.id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async delete(user_id: UserId): Promise<void> {
    const id = user_id.id;

    const affectedRows = await this.userModel.destroy({
      where: { user_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findByIds(ids: UserId[]): Promise<User[]> {
    const models = await this.userModel.findAll({
      where: {
        user_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => UserModelMapper.toEntity(m));
  }

  async existsById(
    ids: UserId[]
  ): Promise<{ exists: UserId[]; not_exists: UserId[] }> {
    if (!ids.length) {
      throw new InvalidArgumentError(
        "ids must be an array with at least one element"
      );
    }

    const existsUserModels = await this.userModel.findAll({
      attributes: ["user_id"],
      where: {
        user_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    const existsUserIds = existsUserModels.map((m) => new UserId(m.user_id));
    const notExistsUserIds = ids.filter(
      (id) => !existsUserIds.some((e) => e.equals(id))
    );
    return {
      exists: existsUserIds,
      not_exists: notExistsUserIds,
    };
  }

  async findById(entity_id: UserId): Promise<User | null> {
    const model = await this.userModel.findByPk(entity_id.id);

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.findAll();
    return models.map((model) => {
      return UserModelMapper.toEntity(model);
    });
  }

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.userModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? //? { order: [[props.sort, props.sort_dir]] }
          { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [["created_at", "desc"]] }),
      offset,
      limit,
    });
    return new UserSearchResult({
      items: models.map((model) => {
        return UserModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.userModel.sequelize!.getDialect() as "mysql";
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
