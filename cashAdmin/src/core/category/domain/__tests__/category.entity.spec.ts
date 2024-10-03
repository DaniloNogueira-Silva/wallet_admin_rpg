import { Category, CategoryId } from "../category.aggregate";

describe("Category Without Validator Unit Tests", () => {
  beforeEach(() => {
    Category.prototype.validate = jest
      .fn()
      .mockImplementation(Category.prototype.validate);
  });
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe("Movie");
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe("Movie");
    expect(category.created_at).toBe(created_at);

    category = new Category({
      name: "Movie",
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe("Movie");
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe("Movie");
    expect(category.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe("Movie");
    expect(category.created_at).toBe(created_at);
  });

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe("Movie");
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
      expect(category.notification.hasErrors()).toBe(false);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe("Movie");
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
      expect(category.notification.hasErrors()).toBe(false);
    });

    test("should create a category with is_active", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe("Movie");
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
      expect(category.notification.hasErrors()).toBe(false);
    });
  });

  describe("category_id field", () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new CategoryId() }];

    test.each(arrange)("should be is %j", (props) => {
      const category = new Category(props as any);
      expect(category.category_id).toBeInstanceOf(CategoryId);
    });
  });

  test("should change name", () => {
    const category = new Category({
      name: "Movie",
    });
    category.changeName("other name");
    expect(category.name).toBe("other name");
    expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
    expect(category.notification.hasErrors()).toBe(false);
  });

  test("should active a category", () => {
    const category = new Category({
      name: "Filmes",
    });
    expect(category.notification.hasErrors()).toBe(false);
  });

  test("should disable a category", () => {
    const category = new Category({
      name: "Filmes",
    });
    expect(category.notification.hasErrors()).toBe(false);
  });
});
