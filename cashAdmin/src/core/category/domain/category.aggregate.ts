import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";
import { CategoryValidatorFactory } from "./category.validator";
import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { ValueObject } from "../../shared/domain/value-object";

export type CategoryConstructorProps = {
  category_id?: CategoryId;
  name: string;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
};

export class CategoryId extends Uuid {}

export class Category extends AggregateRoot {
  category_id: CategoryId;
  name: string;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new CategoryId();
    this.name = props.name;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.category_id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    //category.validate();
    category.validate(["name"]);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    this.validate(["name"]);
  }

  validate(fields?: string[]) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      created_at: this.created_at,
    };
  }
}
