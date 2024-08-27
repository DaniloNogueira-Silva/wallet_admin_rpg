import { UserInMemoryRepository } from "@core/user/infra/db/in-memory/user-in-memory.repository";
import { DeleteUserUseCase } from "../delete-user.use-case";
import { InvalidUuidError } from "@core/shared/domain/value-objects/uuid.vo";
import { User, UserId } from "@core/user/domain/user.aggregate";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";

describe("DeleteUserUseCase Unit Tests", () => {
  let useCase: DeleteUserUseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new DeleteUserUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const userId = new UserId();

    await expect(() => useCase.execute({ id: userId.id })).rejects.toThrow(
      new NotFoundError(userId.id, User)
    );
  });

  it("should delete a user", async () => {
    const items = [
      new User({ name: "test 1", email: "test", password: "test" }),
    ];
    repository.items = items;
    await useCase.execute({
      id: items[0].user_id.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
