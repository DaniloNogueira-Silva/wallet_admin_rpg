import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "users", timestamps: false })
export class UserModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare user_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare email: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare password: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @Column({ allowNull: true, type: DataType.DATE(3) })
  declare updated_at: Date;

  @Column({ allowNull: true, type: DataType.DATE(3) })
  declare deleted_at: Date;
}
