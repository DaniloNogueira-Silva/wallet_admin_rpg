import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError } from "../../../../../shared/domain/value-objects/uuid.vo";
import {
  Transaction,
  TransactionId,
} from "../../../../domain/transaction.aggregate";
import { TransactionInMemoryRepository } from "../../../../infra/db/in-memory/transaction-in-memory.repository";
import { DeleteTransactionUseCase } from "../delete-transaction.use-case";

describe("DeleteTransactionUseCase Unit Tests", () => {
  let useCase: DeleteTransactionUseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new DeleteTransactionUseCase(repository);
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

  it("should delete a transaction", async () => {
    const items = [
      new Transaction({
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
    await useCase.execute({
      id: items[0].transaction_id.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
