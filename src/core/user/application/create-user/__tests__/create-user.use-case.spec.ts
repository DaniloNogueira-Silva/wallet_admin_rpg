import { UserInMemoryRepository } from "src/core/user/infra/db/in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "../create-user.use-case";

describe("CreateUserUseCase Unit Tests", () => {
  let useCase: CreateUserUseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase(repository);
  });

  it("should throw an error when aggregate is not valid", async () => {
    const input = {
      name: "t".repeat(256),
      email: "invalid_email",
      password: "test",
    };
    await expect(() => useCase.execute(input)).rejects.toThrowError(
      "Entity Validation Error"
    );
  });

  it("should create a user", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    let output = await useCase.execute({
      name: "test",
      email: "test@email.com",
      password: "test",
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].user_id.id,
      name: "test",
      email: "test@email.com",
      password: "test",
      updated_at: repository.items[0].created_at,
      deleted_at: null,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: "test",
      email: "test@email.com",
      password: "test",
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].user_id.id,
      name: "test",
      email: "test@email.com",
      password: "test",
      updated_at: repository.items[1].created_at,
      deleted_at: null,
      created_at: repository.items[1].created_at,
    });
  });
});
