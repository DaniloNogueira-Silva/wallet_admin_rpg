import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface UserModelProps {
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

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

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare updated_at: Date;

  @Column({ allowNull: true, type: DataType.DATE(3) })
  declare deleted_at: Date;
}
