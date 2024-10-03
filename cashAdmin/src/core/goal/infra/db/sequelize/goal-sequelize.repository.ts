import { Op, literal } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Goal, GoalId } from "../../../domain/goal.aggregate";
import { GoalModelMapper } from "./goal-model-mapper";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { InvalidArgumentError } from "../../../../shared/domain/errors/invalid-argument.error";
import { GoalSearchParams, GoalSearchResult, IGoalRepository } from "../../../domain/goal.repository";
import { GoalModel } from "./goal-model";

export class GoalSequelizeRepository implements IGoalRepository {
  sortableFields: string[] = ["name", "end_date"];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`), //ascii
    },
  };

  constructor(private goalModel: typeof GoalModel) {}

  async insert(entity: Goal): Promise<void> {
    const modelProps = GoalModelMapper.toModel(entity);
    await this.goalModel.create(modelProps.toJSON());
  }

  async bulkInsert(entities: Goal[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      GoalModelMapper.toModel(entity).toJSON()
    );
    await this.goalModel.bulkCreate(modelsProps);
  }

  async update(entity: Goal): Promise<void> {
    const id = entity.goal_id.id;

    const modelProps = GoalModelMapper.toModel(entity);
    const [affectedRows] = await this.goalModel.update(modelProps.toJSON(), {
      where: { goal_id: entity.goal_id.id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async delete(goal_id: GoalId): Promise<void> {
    const id = goal_id.id;

    const affectedRows = await this.goalModel.destroy({
      where: { goal_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findByIds(ids: GoalId[]): Promise<Goal[]> {
    const models = await this.goalModel.findAll({
      where: {
        goal_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => GoalModelMapper.toEntity(m));
  }

  async existsById(
    ids: GoalId[]
  ): Promise<{ exists: GoalId[]; not_exists: GoalId[] }> {
    if (!ids.length) {
      throw new InvalidArgumentError(
        "ids must be an array with at least one element"
      );
    }

    const existsGoalModels = await this.goalModel.findAll({
      attributes: ["goal_id"],
      where: {
        goal_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    const existsGoalIds = existsGoalModels.map((m) => new GoalId(m.goal_id));
    const notExistsGoalIds = ids.filter(
      (id) => !existsGoalIds.some((e) => e.equals(id))
    );
    return {
      exists: existsGoalIds,
      not_exists: notExistsGoalIds,
    };
  }

  async findById(entity_id: GoalId): Promise<Goal | null> {
    const model = await this.goalModel.findByPk(entity_id.id);

    return model ? GoalModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Goal[]> {
    const models = await this.goalModel.findAll();
    return models.map((model) => {
      return GoalModelMapper.toEntity(model);
    });
  }

  async search(props: GoalSearchParams): Promise<GoalSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.goalModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? //? { order: [[props.sort, props.sort_dir]] }
          { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [["end_date", "desc"]] }),
      offset,
      limit,
    });
    return new GoalSearchResult({
      items: models.map((model) => {
        return GoalModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.goalModel.sequelize!.getDialect() as "mysql";
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => Goal {
    return Goal;
  }
}
