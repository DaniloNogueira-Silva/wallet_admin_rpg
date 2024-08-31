import { DataTypes, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('wallets', {
    wallet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    savings: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('wallets');
};
