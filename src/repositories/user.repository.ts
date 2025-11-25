import { User } from "../types/user.types";

// In-memory storage - 
let users: any[] = [
  { id: "user1", username: 'john_doe', email: 'john@example.com', name: 'John Doe', age: 30 },
  { id: "user2", username: 'jane_smith', email: 'jane@example.com', name: 'Jane Smith', age: 25 },
];

export interface IUserRepository{
    getAllUsers():User[];
    getOneUser(id:String):User | undefined;
    createUser(user:User):User;
    updateUser(id:String, user: Partial <User>):User | undefined;
    deleteUser(id:String): boolean;

}

export class UserRepository implements IUserRepository{
    getAllUsers(): User[] {
        return users;
    }
    getOneUser(id: String): User | undefined {
        return users.find(users => users.id === id);
    }
    createUser(user: User): User {
        users.push(user);
        return user;
    }
    updateUser(id: String, user: Partial<User>): User | undefined {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return undefined;
    }
    users[index] = { ...users[index], ...user };
    return users[index];
  }

  deleteUser(id: String): boolean {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return false;
    }
    users.splice(index, 1);
    return true;
  }

}