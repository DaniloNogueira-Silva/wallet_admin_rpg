import { SortDirection } from 'src/core/shared/domain/repository/search-params';
import { UsersController } from '../users.controller';
import { CreateUserOutput } from '../../../core/user/application/use-cases/create-user/create-user.use-case';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UserCollectionPresenter,
  UserPresenter,
} from '../users.presenter';
import { UpdateUserOutput } from '../../../core/user/application/use-cases/update-user/update-user.use-case';
import { UpdateUserInput } from '../../../core/user/application/use-cases/update-user/update-user.input';
import { GetUserOutput } from '../../../core/user/application/use-cases/get-user/get-user.use-case';
import { ListUsersOutput } from '../../../core/user/application/use-cases/list-users/list-users.use-case';

describe('UsersController Unit Tests', () => {
  let controller: UsersController;

  beforeEach(async () => {
    controller = new UsersController();
  });

  it('should creates a user', async () => {
    //Arrange
    const output: CreateUserOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateUserDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(new UserPresenter(output));
  });

  it('should updates a user', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: UpdateUserOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: Omit<UpdateUserInput, 'id'> = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(new UserPresenter(output));
  });

  it('should deletes a user', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error defined part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a user', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: GetUserOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['getUseCase'] = mockGetUseCase;
    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(new UserPresenter(output));
  });

  it('should list users', async () => {
    const output: ListUsersOutput = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(UserCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new UserCollectionPresenter(output));
  });
});
