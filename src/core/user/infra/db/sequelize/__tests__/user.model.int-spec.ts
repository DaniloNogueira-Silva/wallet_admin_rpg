import { DataType, Sequelize } from "sequelize-typescript";
import { UserModel } from "../user.model";

describe("UserModel Integration Test", () => {
  let sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [UserModel],
    });

    await sequelize.sync({ force: true });
  });

  test("should a mapping props", async () => {
    const attributesMap = UserModel.getAttributes();
    const attributes = Object.keys(UserModel.getAttributes());
    expect(attributes).toEqual([
      "user_id",
      "name",
      "email",
      "password",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);

    const userIdAttr = attributesMap.user_id;
    expect(userIdAttr).toMatchObject({
      field: "user_id",
      fieldName: "user_id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const emailAttr = attributesMap.email;
    expect(emailAttr).toMatchObject({
      field: "email",
      fieldName: "email",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const passwordAttr = attributesMap.password;
    expect(passwordAttr).toMatchObject({
      field: "password",
      fieldName: "password",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });

    const updatedAtAttr = attributesMap.updated_at;
    expect(updatedAtAttr).toMatchObject({
      field: "updated_at",
      fieldName: "updated_at",
      allowNull: true,
      type: DataType.DATE(3),
    });

    const deletedAtAttr = attributesMap.deleted_at;
    expect(deletedAtAttr).toMatchObject({
      field: "deleted_at",
      fieldName: "deleted_at",
      allowNull: true,
      type: DataType.DATE(3),
    });
  });

  test("create", async () => {
    //arrange
    const arrange = {
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
      email: "test@gmail.com",
      password: "123456",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    //act
    const user = await UserModel.create(arrange);

    //assert
    expect(user.toJSON()).toStrictEqual(arrange);
  });
});
