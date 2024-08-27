import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../../../core/user/domain/user.repository';
import { UsersController } from '../users.controller';
import { ConfigModule } from '../../config-module/config.module';
import { DatabaseModule } from '../../database-module/database.module';
import { UsersModule } from '../users.module';
import { USER_PROVIDERS } from '../users.providers';
import { CreateUserUseCase } from '../../../core/user/application/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from '../../../core/user/application/use-cases/update-user/update-user.use-case';
import { ListUserUseCase } from '../../../core/user/application/use-cases/list-users/list-users.use-case';
import { GetUserUseCase } from '../../../core/user/application/use-cases/get-user/get-user.use-case';
import { DeleteUserUseCase } from '../../../core/user/application/use-cases/delete-user/delete-user.use-case';
import {
  CreateUserFixture,
  ListUsersFixture,
  UpdateUserFixture,
} from '../testing/user-fixture';
import {
  UserCollectionPresenter,
  UserPresenter,
} from '../users.presenter';
import { UserOutputMapper } from '../../../core/user/application/use-cases/common/user-output';
import {
  User,
  UserId,
} from '../../../core/user/domain/user.aggregate';
import { AuthModule } from '../../auth-module/auth.module';

describe('UsersController Integration Tests', () => {
  let controller: UsersController;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        AuthModule,
        UsersModule,
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    repository = module.get<IUserRepository>(
      USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateUserUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateUserUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListUserUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetUserUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteUserUseCase);
  });

  describe('should create a user', () => {
    const arrange = CreateUserFixture.arrangeForCreate();
    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.create(send_data);
        const entity = await repository.findById(new UserId(presenter.id));
        expect(entity!.toJSON()).toStrictEqual({
          user_id: presenter.id,
          created_at: presenter.created_at,
          ...expected,
        });
        const output = UserOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new UserPresenter(output));
      },
    );
  });

  describe('should update a user', () => {
    const arrange = UpdateUserFixture.arrangeForUpdate();

    const user = User.fake().aUser().build();

    beforeEach(async () => {
      await repository.insert(user);
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(
          user.user_id.id,
          send_data,
        );
        const entity = await repository.findById(new UserId(presenter.id));
        expect(entity!.toJSON()).toStrictEqual({
          user_id: presenter.id,
          created_at: presenter.created_at,
          name: expected.name ?? user.name,
          description:
            'description' in expected
              ? expected.description
              : user.description,
          is_active:
            expected.is_active === true || expected.is_active === false
              ? expected.is_active
              : user.is_active,
        });
        const output = UserOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new UserPresenter(output));
      },
    );
  });

  it('should delete a user', async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);
    const response = await controller.remove(user.user_id.id);
    expect(response).not.toBeDefined();
    await expect(repository.findById(user.user_id)).resolves.toBeNull();
  });

  it('should get a user', async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);
    const presenter = await controller.findOne(user.user_id.id);

    expect(presenter.id).toBe(user.user_id.id);
    expect(presenter.name).toBe(user.name);
    expect(presenter.description).toBe(user.description);
    expect(presenter.is_active).toBe(user.is_active);
    expect(presenter.created_at).toStrictEqual(user.created_at);
  });

  describe('search method', () => {
    describe('should sorted users by created_at', () => {
      const { entitiesMap, arrange } =
        ListUsersFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new UserCollectionPresenter({
              items: entities.map(UserOutputMapper.toOutput),
              ...paginationProps.meta,
            }),
          );
        },
      );
    });

    describe('should return users using pagination, sort and filter', () => {
      const { entitiesMap, arrange } = ListUsersFixture.arrangeUnsorted();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new UserCollectionPresenter({
              items: entities.map(UserOutputMapper.toOutput),
              ...paginationProps.meta,
            }),
          );
        },
      );
    });
  });
});
