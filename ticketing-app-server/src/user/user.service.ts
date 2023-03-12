import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, isAdmin } = createUserDto;
    const user = new User();
    user.name = name;
    user.email = email;
    user.isAdmin = isAdmin;
    return this.users.save(user);
  }
  

  findAll(): Promise<User[]> {
    return this.users.find();
  }

  async findUser(options: FindOneOptions<User>): Promise<User> {
    return this.users.findOne(options)
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findUser({where: {id}});
    const updatedUser = Object.assign(user, updateUserDto);
    return this.users.save(updatedUser);
  }


  async remove(user_id: string) {
    await this.users.delete(user_id);
  }
}
