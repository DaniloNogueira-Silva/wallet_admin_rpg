import { CreateUserUseCase } from "@core/user/application/create-user/create-user.use-case";
import { DeleteUserUseCase } from "@core/user/application/delete-user/delete-user.use-case";
import { GetUserUseCase } from "@core/user/application/get-user/get-user.use-case";
import { ListUserUseCase } from "@core/user/application/list-user/list-user.use-case";
import { UpdateUserUseCase } from "@core/user/application/update-user/update-user.use-case";
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
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUsersDto } from "./dto/search-users.dto";
import { UserCollectionPresenter, UserPresenter } from "./users.presenter";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserOutput } from "@core/user/application/common/user-output";

@Controller("users")
export class UsersController {
  @Inject(CreateUserUseCase)
  private createUseCase: CreateUserUseCase;

  @Inject(UpdateUserUseCase)
  private updateUseCase: UpdateUserUseCase;

  @Inject(DeleteUserUseCase)
  private deleteUseCase: DeleteUserUseCase;

  @Inject(GetUserUseCase)
  private getUseCase: GetUserUseCase;

  @Inject(ListUserUseCase)
  private listUseCase: ListUserUseCase;

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUseCase.execute(createUserDto);
    return UsersController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchUsersDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new UserCollectionPresenter(output);
  }

  @Get(":id")
  async findOne(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    const output = await this.getUseCase.execute({ id });
    return UsersController.serialize(output);
  }

  @Patch(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const output = await this.updateUseCase.execute({
      ...updateUserDto,
      id,
    });
    return UsersController.serialize(output);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: UserOutput) {
    return new UserPresenter(output);
  }
}
