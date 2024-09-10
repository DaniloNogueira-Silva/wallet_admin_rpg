
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

import { WalletOutput } from "src/core/wallet/application/use-cases/common/wallet-output";
import { WalletCollectionPresenter, WalletPresenter } from "./walllet.presenter";
import { SearchWalletsDto } from "./dto/search-walllets.dto";
import { CreateWalletDto } from "./dto/create-walllet.dto";
import { UpdateWalletDto } from "./dto/update-walllet.dto";
import { CreateWalletUseCase } from "src/core/wallet/application/use-cases/create-wallet/create-wallet.use-case";
import { UpdateWalletUseCase } from "src/core/wallet/application/use-cases/update-wallet/update-wallet.use-case";
import { DeleteWalletUseCase } from "src/core/wallet/application/use-cases/delete-wallet/delete-wallet.use-case";
import { GetWalletUseCase } from "src/core/wallet/application/use-cases/get-wallet/get-wallet.use-case";
import { ListWalletsUseCase } from "src/core/wallet/application/use-cases/list-wallets/list-wallets.use-case";


@Controller("wallets")
export class WalletsController {
  @Inject(CreateWalletUseCase)
  private createUseCase: CreateWalletUseCase;

  @Inject(UpdateWalletUseCase)
  private updateUseCase: UpdateWalletUseCase;

  @Inject(DeleteWalletUseCase)
  private deleteUseCase: DeleteWalletUseCase;

  @Inject(GetWalletUseCase)
  private getUseCase: GetWalletUseCase;

  @Inject(ListWalletsUseCase)
  private listUseCase: ListWalletsUseCase;

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    const output = await this.createUseCase.execute(createWalletDto);
    return WalletsController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchWalletsDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new WalletCollectionPresenter(output);
  }

  @Get(":id")
  async findOne(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    const output = await this.getUseCase.execute({ id });
    return WalletsController.serialize(output);
  }

  @Patch(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateWalletDto: UpdateWalletDto
  ) {
    const output = await this.updateUseCase.execute({
      ...updateWalletDto,
      id,
    });
    return WalletsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: WalletOutput) {
    return new WalletPresenter(output);
  }
}
