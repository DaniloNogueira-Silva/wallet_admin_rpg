import { FieldsErrors } from "./validator-fields-interface";

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors, message = "Validation error") {
    super(message);
  }

  cont() {
    return Object.keys(this.error).length;
  }
}
