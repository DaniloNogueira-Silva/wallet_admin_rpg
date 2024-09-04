import { Category } from "../../../domain/category.aggregate";

export type CategoryOutput = {
  id: string;
  name: string;
  created_at: Date;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    const { category_id, ...otherProps } = entity.toJSON();
    return {
      id: category_id,
      ...otherProps,
    };
  }
}
