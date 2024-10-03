import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export type GoalModelProps = {
  goal_id: string;
  name: string;
  description?: string;
  balance: number;
  end_date: Date;
};

@Table({ tableName: "goal", timestamps: false })
export class GoalModel extends Model<GoalModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare goal_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  declare description: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  declare balance: number;

  @Column({ allowNull: false, type: DataType.DATE(6) })
  declare end_date: Date;
}
