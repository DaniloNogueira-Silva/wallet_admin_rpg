import { UserInMemoryRepository } from "@core/user/infra/db/in-memory/user-in-memory.repository";
import { ListUserUseCase } from "../list-users.use-case";
import { UserSearchResult } from "@core/user/domain/user.repository";
import { User } from "@core/user/domain/user.aggregate";
import { UserOutputMapper } from "../../common/user-output";

describe("ListUserUseCase Unit Tests", () => {
  let useCase: ListUserUseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new ListUserUseCase(repository);
  });

  test("toOutput method", () => {
    let result = new UserSearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
    });
    let output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = User.create({
      name: "user",
      email: "user@email.com",
      password: "user",
    });
    result = new UserSearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
    });

    output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [entity].map(UserOutputMapper.toOutput),
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should return output sorted by created_at when input param is empty", async () => {
    const items = [
      new User({
        name: "user",
        email: "user@email.com",
        password: "user",
      }),
      new User({
        name: "user1",
        email: "user1@email.com",
        password: "user1",
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map(UserOutputMapper.toOutput),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should return output using pagination, sort and filter", async () => {
    const items = [
      new User({ name: "a", email: "a", password: "a" }),
      new User({
        name: "AAA",
        email: "AAA",
        password: "AAA",
      }),
      new User({
        name: "AaA",
        email: "AaA",
        password: "AaA",
      }),
      new User({
        name: "b",
        email: "b",
        password: "b",
      }),
      new User({
        name: "c",
        email: "c",
        password: "c",
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[1], items[2]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0], items[2]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
