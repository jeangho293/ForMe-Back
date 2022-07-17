import { Service, Inject } from 'typedi';
import Boom from 'boom';
import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';

@Service()
export class UserService {
  @Inject()
  private userRepository!: UserRepository;

  async register({
    name,
    password,
    checkPassword,
    email,
  }: {
    name: string;
    password: string;
    checkPassword: string;
    email: string;
  }) {
    const [user] = await this.userRepository.find({ name });

    if (user) {
      throw Boom.badRequest('중복임');
    }

    return this.userRepository.save(User.Create({ name, password, email }));
  }
}
