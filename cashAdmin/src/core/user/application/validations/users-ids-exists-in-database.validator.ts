import { Either } from '../../../shared/domain/either';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { User, UserId } from '../../domain/user.aggregate';
import { IUserRepository } from '../../domain/user.repository';

export class UserIdExistsInDatabaseValidator {
  constructor(private userRepo: IUserRepository) {}

  async validate(
    user_id: string[],
  ): Promise<Either<UserId[], NotFoundError[]>> {
    const userId = user_id.map((v) => new UserId(v));

    const existsResult = await this.userRepo.existsById(userId);
    return existsResult.not_exists.length > 0
      ? Either.fail(
          existsResult.not_exists.map((c) => new NotFoundError(c.id, User)),
        )
      : Either.ok(userId);
  }
}
