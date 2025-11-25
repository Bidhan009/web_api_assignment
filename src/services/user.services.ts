import { IUserRepository, UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.types";

let userRepository: IUserRepository = new UserRepository();

export class UserService{
    getAllUsers = () => {
        let response = userRepository.getAllUsers().map((user)=>{
            return{...user, username :user.username}
        });
            return response;
    }
    getOneUser = (id:String)=> {
        return userRepository.getOneUser(id);
    }
    createUser = (user: User)=>{
        const exist = userRepository.getOneUser(user.id);
        if(exist){
            throw new Error ("User with this ID already exists")
        }
        return userRepository.createUser(user);
    }
    updateUser = (id: String, user: Partial<User>)=>{
        const exits = userRepository.getOneUser(id);
        if(!exits){
            throw new Error("User not found");
        }
        return userRepository.updateUser(id, user);
    };
    deleteUser = (id: String)=>{
        const exits = userRepository.getOneUser(id);
        if(!exits){
            throw new Error("User not found");
        }
        return userRepository.deleteUser(id);
    }

}