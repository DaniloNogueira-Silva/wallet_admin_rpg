import { User, UserId } from "../user.aggregate";

describe("User", () => {
  beforeEach(() => {
    jest.spyOn(User.prototype, 'validate').mockImplementation(() => true);
  });

  test("constructor of user", () => {
    let user = new User({
      name: "Danilo",
      email: "a@a.com",
      password: "1234",
    });

    expect(user.user_id).toBeInstanceOf(UserId);
    expect(user.name).toBe("Danilo");
    expect(user.email).toBe("a@a.com");
    expect(user.password).toBe("1234");
    expect(user.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    user = new User({
      name: "Danilo",
      email: "a@a.com",
      password: "1234",
      created_at,
    });
    expect(user.user_id).toBeInstanceOf(UserId);
    expect(user.name).toBe("Danilo");
    expect(user.email).toBe("a@a.com");
    expect(user.password).toBe("1234");
    expect(user.created_at).toBe(created_at);
  });

  test.each([
    { name: "Danilo", email: "a@a.com", password: "1234" },
    { name: "Danilo", email: "a@a.com", password: "1234", id: null },
  ])("should create a User with props %j", (item) => {
    const user = new User(item);
    expect(user.user_id).toBeInstanceOf(UserId);
  });

  test("Create command", () => {
    const user = User.create({
      name: "Danilo",
      email: "a@a.com",
      password: "1234",
    });
    expect(user.user_id).toBeInstanceOf(UserId);
    expect(user.name).toBe("Danilo");
    expect(user.email).toBe("a@a.com");
    expect(user.password).toBe("1234");
    expect(user.created_at).toBeInstanceOf(Date);
    expect(User.prototype.validate).toHaveBeenCalledTimes(1);
    expect(user.notification.hasErrors()).toBe(false);
  });

  test.each([
    { id: null },
    { id: undefined },
    { id: new UserId() },
  ])("should create a User with user_id %j", (props) => {
    const user = new User({
      name: "Danilo",
      email: "a@a.com",
      password: "1234",
      ...props,
    });
    expect(user.user_id).toBeInstanceOf(UserId);
  });
});
