import { UserSequelizeRepository } from "../../../infra/db/sequelize/user-sequelize-repository";
import { GetUserUseCase } from "../get-user.use-case";
import { UserModel } from "../../../infra/db/sequelize/user.model";
import { setupSequelize } from "../../../../shared/infra/testing/helpers";
import { User, UserId } from "../../../domain/user.aggregate";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";

describe("GetUserUseCase Integration Tests", () => {
  let useCase: GetUserUseCase;
  let repository: UserSequelizeRepository;

  setupSequelize({ models: [UserModel] });

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel);
    useCase = new GetUserUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    const userId = new UserId();
    await expect(() => useCase.execute({ id: userId.id })).rejects.toThrow(
      new NotFoundError(userId.id, User)
    );
  });

  it("should returns a user", async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);
    const output = await useCase.execute({ id: user.user_id.id });
    expect(output).toStrictEqual({
      id: user.user_id.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    });
  });
});
