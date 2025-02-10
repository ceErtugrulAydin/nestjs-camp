import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService {
  getAllUsers(): UserModel[] {
    if (result.length === 0) {
      this.creatingMockUser({
        birthDay: new Date(),
        email: 'ertu@mail.com',
        image: 'ertuImage',
        name: 'Ertu',
        password: '6161',
        surname: 'BABA',
      });
    }

    return result;
  }

  getUserById(id: string): any {
    const user = result.find((user) => user.id === id);

    if (!user) {
      return 'User not found';
    } else {
      return user;
    }
  }

  createUser(body: UserCreateDto) {
    const isExist = result.find((user) => user.email === body.email);
    if (isExist) {
      return isExist;
    } else {
      this.creatingMockUser(body);
      return result.slice(result.length - 1, result.length);
    }
  }

  private creatingMockUser(data: any) {
    const user = new UserModel();
    user.birthDay = data.birthDay;
    user.email = data.email;
    user.image = data.image;
    user.name = data.name;
    user.password = data.password;
    user.surname = data.surname;
    user.id = (Math.floor(Math.random() * 60) + 1).toString();
    result.push(user);
  }
}
