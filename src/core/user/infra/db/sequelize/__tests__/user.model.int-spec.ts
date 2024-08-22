import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../user.model";
import { User } from "@core/user/domain/user.aggregate";

describe("UserModel Integration Test", () => {
  test("should create a user", async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [UserModel],
    });

    await sequelize.sync({ force: true });

    const user = User.fake().aUser().build();

    UserModel.create({
      user_id: user.user_id.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    });
  });
});
