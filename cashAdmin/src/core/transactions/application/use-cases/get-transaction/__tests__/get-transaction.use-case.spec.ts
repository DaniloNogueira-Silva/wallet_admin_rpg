import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError } from "../../../../../shared/domain/value-objects/uuid.vo";
import {
  Transaction,
  TransactionId,
} from "../../../../domain/transaction.aggregate";
import { TransactionInMemoryRepository } from "../../../../infra/db/in-memory/transaction-in-memory.repository";
import { GetTransactionUseCase } from "../get-transaction.use-case";

describe("GetTransactionUseCase Unit Tests", () => {
  let useCase: GetTransactionUseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new GetTransactionUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const transactionId = new TransactionId();
    await expect(() =>
      useCase.execute({ id: transactionId.id })
    ).rejects.toThrow(new NotFoundError(transactionId.id, Transaction));
  });

  it("should returns a transaction", async () => {
    const items = [
      Transaction.create({
        wallet_id: "12345-6789",
        category_id: "12345-6789",
        value: 1000,
        name: "Compras",
        status: "PAGO",
        type: "DESPESA",
        effective_date: new Date("2022-01-01"),
      }),
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].transaction_id.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].transaction_id.id,
      wallet_id: "12345-6789",
      category_id: "12345-6789",
      value: 1000,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
      created_at: items[0].created_at,
    });
  });
});
