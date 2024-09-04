import { setupSequelize } from "../../../../../shared/infra/testing/helpers";
import { CategoryId } from "../../../../domain/category.aggregate";
import { CategorySequelizeRepository } from "../../../../infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../../../../infra/db/sequelize/category.model";
import { CreateCategoryUseCase } from "../create-category.use-case";

describe("CreateCategoryUseCase Integration Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    let entity = await repository.findById(new CategoryId(output.id));
    expect(output).toStrictEqual({
      id: entity!.category_id.id,
      name: "test",
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      name: "test",
    });
    entity = await repository.findById(new CategoryId(output.id));
    expect(output).toStrictEqual({
      id: entity!.category_id.id,
      name: "test",
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      name: "test",
    });
    entity = await repository.findById(new CategoryId(output.id));
    expect(output).toStrictEqual({
      id: entity!.category_id.id,
      name: "test",
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      name: "test",
    });
    entity = await repository.findById(new CategoryId(output.id));
    expect(output).toStrictEqual({
      id: entity!.category_id.id,
      name: "test",
      created_at: entity!.created_at,
    });
  });
});
