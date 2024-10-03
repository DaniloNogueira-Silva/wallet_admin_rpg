import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  HttpCode,
  Query,
} from "@nestjs/common";

import { TransactionOutput } from "../../core/transactions/application/use-cases/common/transaction-output";
import {
  TransactionCollectionPresenter,
  TransactionPresenter,
} from "./transaction.presenter";
import { SearchTransactionsDto } from "./dto/search-transaction.dto";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { CreateTransactionUseCase } from "../../core/transactions/application/use-cases/create-transaction/create-transaction.use-case";
import { UpdateTransactionUseCase } from "../../core/transactions/application/use-cases/update-transaction/update-transaction.use-case";
import { DeleteTransactionUseCase } from "../../core/transactions/application/use-cases/delete-transaction/delete-transaction.use-case";
import { GetTransactionUseCase } from "../../core/transactions/application/use-cases/get-transaction/get-transaction.use-case";
import { ListTransactionsUseCase } from "../../core/transactions/application/use-cases/list-transactions/list-transaction.use-case";

@Controller("transactions")
export class TransactionsController {
  @Inject(CreateTransactionUseCase)
  private createUseCase: CreateTransactionUseCase;

  @Inject(UpdateTransactionUseCase)
  private updateUseCase: UpdateTransactionUseCase;

  @Inject(DeleteTransactionUseCase)
  private deleteUseCase: DeleteTransactionUseCase;

  @Inject(GetTransactionUseCase)
  private getUseCase: GetTransactionUseCase;

  @Inject(ListTransactionsUseCase)
  private listUseCase: ListTransactionsUseCase;

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const output = await this.createUseCase.execute(createTransactionDto);
    return TransactionsController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchTransactionsDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new TransactionCollectionPresenter(output);
  }

  @Get(":id")
  async findOne(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    const output = await this.getUseCase.execute({ id });
    return TransactionsController.serialize(output);
  }

  @Patch(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    const output = await this.updateUseCase.execute({
      ...updateTransactionDto,
      id,
    });
    return TransactionsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: TransactionOutput) {
    return new TransactionPresenter(output);
  }
}
