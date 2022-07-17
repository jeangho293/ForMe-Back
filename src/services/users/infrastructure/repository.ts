import { Service } from 'typedi';
import { In } from 'typeorm';
import { mysqlConnect } from '../../../configs';
import { User } from '../domain/model';

@Service()
export class UserRepository {
  private userRepository = mysqlConnect.getRepository(User);

  /**
   *
   * @param conditions
   */
  async find(conditions: { ids?: number[]; name?: string }) {
    return this.userRepository.manager.find(User, {
      where: strip({
        id: checkArrayValue(conditions.ids),
        name: conditions.name,
      }),
    });
  }

  async save(user: User) {
    return this.userRepository.save(user);
  }
}

function strip(obj: Record<string, any>) {
  return Object.keys(obj).reduce((stripped, key) => {
    if (typeof obj[key] !== 'undefined') {
      stripped[key] = obj[key];
    }
    return stripped;
  }, {} as Record<string, any>);
}

function checkArrayValue(value?: any[]) {
  return value && value.length > 0 && In(value);
}
