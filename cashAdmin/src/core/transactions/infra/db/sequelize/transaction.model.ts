import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CategoryModel } from "src/core/category/infra/db/sequelize/category.model";
import { WalletModel } from "src/core/wallet/infra/db/sequelize/wallet.model";

export type TransactionModelProps = {
  transaction_id: string;
  wallet_id: string;
  category_id: string;
  name: string;
  status: string;
  value: number;
  type: string;
  effective_date: Date;
  created_at: Date;
};

@Table({ tableName: "transactions", timestamps: false })
export class TransactionModel extends Model<TransactionModelProps> {
  @PrimaryKey
  @Column({allowNull: false, type: DataType.UUID })
  declare transaction_id: string;

  @ForeignKey(() => WalletModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare wallet_id: string;

  @ForeignKey(() => CategoryModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare category_id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare status: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  declare value: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare type: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare effective_date: Date;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;
}
