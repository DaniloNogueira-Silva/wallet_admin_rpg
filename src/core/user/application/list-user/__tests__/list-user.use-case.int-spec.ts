import { UserOutputMapper } from "../../common/user-output";
import { UserSequelizeRepository } from "@core/user/infra/db/sequelize/user-sequelize-repository";
import { UserModel } from "@core/user/infra/db/sequelize/user.model";
import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { User } from "@core/user/domain/user.aggregate";
import { ListUserUseCase } from "../list-user.use-case";

describe("ListUserUseCase Integration Tests", () => {
  let useCase: ListUserUseCase;
  let repository: UserSequelizeRepository;

  setupSequelize({ models: [UserModel] });

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel);
    useCase = new ListUserUseCase(repository);
  });

  it("should return output sorted by created_at when input param is empty", async () => {
    const user = User.fake()
      .theUsers(2)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build();

    await repository.bulkInsert(user);
    const output = await useCase.execute({});
    expect(output).toEqual({
      items: [...user].reverse().map(UserOutputMapper.toOutput),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const user = [
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
    await repository.bulkInsert(user);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toEqual({
      items: [user[1], user[2]].map(UserOutputMapper.toOutput),
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
    expect(output).toEqual({
      items: [user[0]].map(UserOutputMapper.toOutput),
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
    expect(output).toEqual({
      items: [user[0], user[2]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
