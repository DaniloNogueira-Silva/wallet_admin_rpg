import { MigrationFn } from "umzug";
import { Sequelize, DataTypes } from "sequelize";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("goal", {
    goal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("goal");
};
