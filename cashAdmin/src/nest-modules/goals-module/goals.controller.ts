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
import { CreateGoalUseCase } from "../../core/goal/application/use-cases/create-goal/create-goal.use-case";

import { GoalOutput } from "../../core/goal/application/use-cases/common/goal-output";
import { UpdateGoalUseCase } from "../../core/goal/application/use-cases/update-goal/update-goal.use-case";
import { GetGoalUseCase } from "../../core/goal/application/use-cases/get-goal/get-goal.use-case";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { DeleteGoalUseCase } from "src/core/goal/application/use-cases/delete-goal/delete-genre.use-case";
import { ListGoalsUseCase } from "src/core/goal/application/use-cases/list-goal/list-goals.use-case";
import { SearchGoalsDto } from "./dto/search-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { GoalCollectionPresenter, GoalPresenter } from "./goals.presenter";

@Controller("goals")
export class GoalsController {
  @Inject(CreateGoalUseCase)
  private createUseCase: CreateGoalUseCase;

  @Inject(UpdateGoalUseCase)
  private updateUseCase: UpdateGoalUseCase;

  @Inject(DeleteGoalUseCase)
  private deleteUseCase: DeleteGoalUseCase;

  @Inject(GetGoalUseCase)
  private getUseCase: GetGoalUseCase;

  @Inject(ListGoalsUseCase)
  private listUseCase: ListGoalsUseCase;

  @Post()
  async create(@Body() createGoalDto: CreateGoalDto) {
    const output = await this.createUseCase.execute(createGoalDto);
    return GoalsController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchGoalsDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new GoalCollectionPresenter(output);
  }

  @Get(":id")
  async findOne(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    const output = await this.getUseCase.execute({ id });
    return GoalsController.serialize(output);
  }

  @Patch(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateGoalDto: UpdateGoalDto
  ) {
    const output = await this.updateUseCase.execute({
      ...updateGoalDto,
      id,
    });
    return GoalsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: GoalOutput) {
    return new GoalPresenter(output);
  }
}
