import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


@Controller('users') // Use the appropriate route prefix
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(@Query('role') role?: 'Intern' | 'admin' | 'user') {
        return this.userService.findAll(role); // Ensure the method is called correctly
    }

    @Get('intern')
    findIntern() {
        return this.userService.findAll('Intern'); // You may want to fetch all users with the role 'Intern'
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO);
    }

    @Patch(':id')
    patchOne(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDTO: UpdateUserDTO) {
        return this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
