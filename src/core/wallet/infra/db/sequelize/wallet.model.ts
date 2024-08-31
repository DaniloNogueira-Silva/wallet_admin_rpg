import { UserModel } from "@core/user/infra/db/sequelize/user.model";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export type WalletModelProps = {
  wallet_id: string;
  user_id: string;
  balance: number | null;
  savings: number | null;
  created_at: Date;
};

@Table({ tableName: "wallets", timestamps: false })
export class WalletModel extends Model<WalletModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare wallet_id: string;

  @ForeignKey(() => UserModel)
  @Column({allowNull: false, type: DataType.UUID })
  declare user_id: string;

  @Column({ allowNull: true, type: DataType.FLOAT })
  declare balance: number;

  @Column({ allowNull: true, type: DataType.FLOAT })
  declare savings: number;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;
}
