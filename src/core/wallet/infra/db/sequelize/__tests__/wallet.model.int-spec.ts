import { DataType } from "sequelize-typescript";
import { WalletModel } from "../wallet.model";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe("WalletModel Integration Tests", () => {
  setupSequelize({ models: [WalletModel] });

  test("mapping props", () => {
    const attributesMap = WalletModel.getAttributes();
    const attributes = Object.keys(WalletModel.getAttributes());

    expect(attributes).toStrictEqual([
      "wallet_id",
      "user_id",
      "balance",
      "savings",
      "created_at",
    ]);

    const walletIdAttr = attributesMap.wallet_id;
    expect(walletIdAttr).toMatchObject({
      field: "wallet_id",
      fieldName: "wallet_id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.user_id;
    expect(nameAttr).toMatchObject({
      field: "user_id",
      fieldName: "user_id",
      allowNull: false,
      type: DataType.UUID(),
    });

    const descriptionAttr = attributesMap.balance;
    expect(descriptionAttr).toMatchObject({
      field: "balance",
      fieldName: "balance",
      allowNull: true,
      type: DataType.FLOAT(),
    });

    const isActiveAttr = attributesMap.savings;
    expect(isActiveAttr).toMatchObject({
      field: "savings",
      fieldName: "savings",
      allowNull: true,
      type: DataType.FLOAT(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test("create", async () => {
    //arrange
    const arrange = {
      wallet_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 1000,
      savings: 500,
      created_at: new Date(),
    };

    //act
    const wallet = await WalletModel.create(arrange);

    //assert
    expect(wallet.toJSON()).toStrictEqual(arrange);
  });
});
