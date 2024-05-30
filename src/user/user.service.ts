import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';



@Injectable()
export class UserService {
    private users = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            role: "admin"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            role: "user"
        },
        {
            id: 3,
            name: "Carol Williams",
            email: "carol.williams@example.com",
            role: "moderator"
        },
        {
            id: 4,
            name: "David Brown",
            email: "david.brown@example.com",
            role: "user"
        },
        {
            id: 5,
            name: "Ellie Wich",
            email: "elli.wich@example.com",
            role: "Intern"
        }
    ];

    findAll(role?: 'Intern' | 'user' | 'admin') {
        if (role) {
            const rolesArray =  this.users.filter(user => user.role === role);
            if(rolesArray.length === 0 ) throw new
            NotFoundException("User role not found")
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(createUserDTO: CreateUserDTO) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDTO
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDTO: UpdateUserDTO) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDTO };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
