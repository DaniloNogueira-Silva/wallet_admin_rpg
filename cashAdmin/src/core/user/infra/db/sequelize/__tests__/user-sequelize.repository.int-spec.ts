import { UserModel } from "../user.model";
import { UserSequelizeRepository } from "../user-sequelize-repository";
import { User, UserId } from "../../../../domain/user.aggregate";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { UserModelMapper } from "../user-model-mapper";
import {
  UserSearchParams,
  UserSearchResult,
} from "../../../../domain/user.repository";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe("UserSequelizeRepository Integration Test", () => {
  let repository: UserSequelizeRepository;
  setupSequelize({ models: [UserModel] });

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
  });

  it("should inserts a new entity", async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);
    const userCreated = await repository.findById(user.user_id);
    expect(userCreated!.toJSON()).toStrictEqual(user.toJSON());
  });

  it("should finds a entity by id", async () => {
    let entityFound = await repository.findById(new UserId());
    expect(entityFound).toBeNull();

    const entity = User.fake().aUser().build();
    await repository.insert(entity);
    entityFound = await repository.findById(entity.user_id);
    expect(entity.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it("should return all users", async () => {
    const entity = User.fake().aUser().build();
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it("should throw error on update when a entity not found", async () => {
    const entity = User.fake().aUser().build();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.user_id.id, User)
    );
  });

  it("should update a entity", async () => {
    const entity = User.fake().aUser().build();
    await repository.insert(entity);

    entity.changeName("Movie updated");
    await repository.update(entity);

    const entityFound = await repository.findById(entity.user_id);
    expect(entity.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it("should throw error on delete when a entity not found", async () => {
    const userId = new UserId();
    await expect(repository.delete(userId)).rejects.toThrow(
      new NotFoundError(userId.id, User)
    );
  });

  it("should delete a entity", async () => {
    const entity = new User({
      name: "User",
      email: "a@a.com",
      password: "123",
    });
    await repository.insert(entity);

    await repository.delete(entity.user_id);
    await expect(repository.findById(entity.user_id)).resolves.toBeNull();
  });

  describe("search method tests", () => {
    it("should only apply paginate when other params are null", async () => {
      const created_at = new Date();
      const users = User.fake()
        .theUsers(16)
        .withName("User")
        .withEmail("a@a.com")
        .withPassword("123")
        .withCreatedAt(created_at)
        .build();
      await repository.bulkInsert(users);
      const spyToEntity = jest.spyOn(UserModelMapper, "toEntity");

      const searchOutput = await repository.search(new UserSearchParams());
      expect(searchOutput).toBeInstanceOf(UserSearchResult);
      expect(spyToEntity).toHaveBeenCalledTimes(15);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
      });
      searchOutput.items.forEach((item) => {
        expect(item).toBeInstanceOf(User);
        expect(item.user_id).toBeDefined();
      });
      const items = searchOutput.items.map((item) => item.toJSON());
      expect(items).toMatchObject(
        new Array(15).fill({
          name: "User",
          email: "a@a.com",
          password: "123",
          created_at: created_at,
        })
      );
    });

    it("should order by created_at DESC when search params are null", async () => {
      const created_at = new Date();
      const users = User.fake()
        .theUsers(16)
        .withName((index) => `User ${index}`)
        .withEmail("a@a.com")
        .withPassword("123")
        .withCreatedAt((index) => new Date(created_at.getTime() + index))
        .build();
      const searchOutput = await repository.search(new UserSearchParams());
      const items = searchOutput.items;
      [...items].reverse().forEach((item, index) => {
        expect(`Movie ${index}`).toBe(`${users[index + 1].name}`);
      });
    });

    it("should apply paginate and filter", async () => {
      const users = [
        User.fake()
          .aUser()
          .withName("test")
          .withEmail("a@a.com")
          .withPassword("123")
          .withCreatedAt(new Date(new Date().getTime() + 5000))
          .build(),
        User.fake()
          .aUser()
          .withName("a")
          .withEmail("a@a.com")
          .withPassword("123")
          .withCreatedAt(new Date(new Date().getTime() + 4000))
          .build(),
        User.fake()
          .aUser()
          .withName("TEST")
          .withEmail("a@a.com")
          .withPassword("123")
          .withCreatedAt(new Date(new Date().getTime() + 3000))
          .build(),
        User.fake()
          .aUser()
          .withName("TeSt")
          .withEmail("a@a.com")
          .withPassword("123")
          .withCreatedAt(new Date(new Date().getTime() + 1000))
          .build(),
      ];

      await repository.bulkInsert(users);

      let searchOutput = await repository.search(
        new UserSearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new UserSearchResult({
          items: [users[0], users[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
        }).toJSON(true)
      );

      searchOutput = await repository.search(
        new UserSearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new UserSearchResult({
          items: [users[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
        }).toJSON(true)
      );
    });

    it("should apply paginate and sort", async () => {
      expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);

      const users = [
        User.fake()
          .aUser()
          .withName("b")
          .withEmail("a@a.com")
          .withPassword("123")
          .build(),
        User.fake()
          .aUser()
          .withName("a")
          .withEmail("a@a.com")
          .withPassword("123")
          .build(),
        User.fake()
          .aUser()
          .withName("d")
          .withEmail("a@a.com")
          .withPassword("123")
          .build(),
        User.fake()
          .aUser()
          .withName("e")
          .withEmail("a@a.com")
          .withPassword("123")
          .build(),
        User.fake()
          .aUser()
          .withName("c")
          .withEmail("a@a.com")
          .withPassword("123")
          .build(),
      ];
      await repository.bulkInsert(users);

      const arrange = [
        {
          params: new UserSearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          result: new UserSearchResult({
            items: [users[1], users[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
          }),
        },
        {
          params: new UserSearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          result: new UserSearchResult({
            items: [users[4], users[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
          }),
        },
        {
          params: new UserSearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new UserSearchResult({
            items: [users[3], users[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
          }),
        },
        {
          params: new UserSearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new UserSearchResult({
            items: [users[4], users[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
          }),
        },
      ];

      for (const i of arrange) {
        const result = await repository.search(i.params);
        expect(result.toJSON(true)).toMatchObject(i.result.toJSON(true));
      }
    });
  });
});
