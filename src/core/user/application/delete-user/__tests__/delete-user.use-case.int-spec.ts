import { UserSequelizeRepository } from "../../../../user/infra/db/sequelize/user-sequelize-repository";
import { DeleteUserUseCase } from "../delete-user.use-case";
import { UserModel } from "../../../../user/infra/db/sequelize/user.model";
import { setupSequelize } from "../../../../shared/infra/testing/helpers";
import { User, UserId } from "../../../../user/domain/user.aggregate";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";

describe("DeleteUserUseCase Integration Tests", () => {
  let useCase: DeleteUserUseCase;
  let repository: UserSequelizeRepository;

  setupSequelize({ models: [UserModel] });

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel);
    useCase = new DeleteUserUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    const userId = new UserId();
    await expect(() => useCase.execute({ id: userId.id })).rejects.toThrow(
      new NotFoundError(userId.id, User)
    );
  });

  it("should delete a user", async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);
    await useCase.execute({
      id: user.user_id.id,
    });
    await expect(repository.findById(user.user_id)).resolves.toBeNull();
  });
});
