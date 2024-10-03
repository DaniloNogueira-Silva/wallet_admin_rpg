import { Transaction } from "../../../domain/transaction.aggregate";
import { TransactionOutputMapper } from "./transaction-output";

describe("TransactionOutputMapper Unit Tests", () => {
  it("should convert a transaction in output", () => {
    const entity = Transaction.create({
      wallet_id: "123456-789-abc",
      category_id: "123456-789-abc",
      value: 25,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
    });
    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = TransactionOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.transaction_id.id,
      wallet_id: "123456-789-abc",
      category_id: "123456-789-abc",
      value: 25,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
    });
  });
});
