import { UserSequelizeRepository } from "@core/user/infra/db/sequelize/user-sequelize-repository";
import { CreateUserUseCase } from "../create-category.use-case";
import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { UserModel } from "@core/user/infra/db/sequelize/user.model";
import { UserId } from "@core/user/domain/user.aggregate";
import { update } from "lodash";

describe("CreateUserUseCase Integration Tests", () => {
  let useCase: CreateUserUseCase;
  let repository: UserSequelizeRepository;

  setupSequelize({ models: [UserModel] });

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel);
    useCase = new CreateUserUseCase(repository);
  });

  it("should create a user", async () => {
    let output = await useCase.execute({
      name: "test",
      email: "test@email.com",
      password: "test",
    });
    let entity = await repository.findById(new UserId(output.id));
    expect(output).toStrictEqual({
      id: entity!.user_id.id,
      name: "test",
      email: "test@email.com",
      password: "test",
      created_at: entity!.created_at,
      updated_at: entity!.updated_at,
      deleted_at: null,
    });
  });
});
