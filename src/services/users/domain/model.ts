import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

type UserModel = {
  name: string;
  password: string;
  email: string;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id!: number;

  @Column()
  private name!: string;

  @Column()
  private password!: string;

  @Column()
  private email!: string;

  @CreateDateColumn()
  private createAt!: string;

  @UpdateDateColumn()
  private updateAt!: string;

  constructor(args: UserModel) {
    if (args) {
      this.name = args.name;
      this.email = args.email;
      this.password = args.password;
    }
  }

  static Create(args: UserModel) {
    return new User(args);
  }
}
