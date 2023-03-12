import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Request() req): Promise<User> {
    // Check if the authenticated user is an admin
    const currentUser = await this.userService.findUser(req.user.id);
    if (!currentUser.isAdmin) {
      throw new UnauthorizedException('Only admins can create new users');
    }
  
    // Create a new user with the provided data
    return this.userService.create(createUserDto);
  }
  
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUser({where: {id}});
  }

  @Patch(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() UpdateUserDto: Partial<UpdateUserDto>,
  ) {
    const ticket = await this.userService.update(id, UpdateUserDto);
    return { message: 'Ticket updated successfully', ticket };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
