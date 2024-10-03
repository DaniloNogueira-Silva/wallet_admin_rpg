import { setupSequelize } from "../../../../../shared/infra/testing/helpers";
import { TransactionId } from "../../../../domain/transaction.aggregate";
import { TransactionSequelizeRepository } from "../../../../infra/db/sequelize/transaction-sequelize.repository";
import { TransactionModel } from "../../../../infra/db/sequelize/transaction.model";
import { CreateTransactionUseCase } from "../create-transaction.use-case";

describe("CreateTransactionUseCase Integration Tests", () => {
  let useCase: CreateTransactionUseCase;
  let repository: TransactionSequelizeRepository;

  setupSequelize({ models: [TransactionModel] });

  beforeEach(() => {
    repository = new TransactionSequelizeRepository(TransactionModel);
    useCase = new CreateTransactionUseCase(repository);
  });

  it("should create a transaction", async () => {
    let output = await useCase.execute({
      wallet_id: "12345-6789",
      category_id: "12345-6789",
      value: 1000,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
    });
    let entity = await repository.findById(new TransactionId(output.id));
    expect(output).toStrictEqual({
      id: entity!.transaction_id.id,
      wallet_id: "12345-6789",
      category_id: "12345-6789",
      value: 1000,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
    });

    output = await useCase.execute({
      wallet_id: "12345-6789",
      category_id: "12345-6789",
      value: 1000,
      name: "Compras",
      status: "PAGO",
      type: "DESPESA",
      effective_date: new Date("2022-01-01"),
    });
  });
});
