import { UserInMemoryRepository } from "@core/user/infra/db/in-memory/user-in-memory.repository";
import { GetUserUseCase } from "../get-user.use-case";
import { InvalidUuidError } from "@core/shared/domain/value-objects/uuid.vo";
import { User, UserId } from "@core/user/domain/user.aggregate";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";

describe("GetUserUseCase Unit Tests", () => {
  let useCase: GetUserUseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase(repository);
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

  it("should returns a user", async () => {
    const items = [
      User.create({
        name: "test",
        email: "test@email.com",
        password: "test",
      }),
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].user_id.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].user_id.id,
      name: "test",
      email: "test@email.com",
      password: "test",
      created_at: items[0].created_at,
      updated_at: items[0].updated_at,
      deleted_at: null,
    });
  });
});
