import { Router, Request, Response } from "express";
import {z} from 'zod';
import { UserService } from "../services/user.services";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from "../types/user.types";


let userService : UserService = new UserService();

export class UserController {
    createUser = (req: Request, res: Response) => {
        try{
            const validation = CreateUserDTO.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({errors: validation.error})
            }
            const {id, username, email, name, age}= validation.data;
            const newUser: User = userService.createUser({id, username, email, name, age})
            return res.status(201).json(newUser);
        }
        catch(error:Error|any){
            return res.status(400).json({message: error.message ??"Something went w"})
        }
    }
    getUsers = (req: Request, res: Response) => {
        let response = userService.getAllUsers();
        res.status(200).json(response);
    };
    getUserById = (req: Request, res: Response)=> {
        try{
            const userId = req.params.userid;
            const user = userService.getOneUser(userId);

            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            return res.status(200).json(user);
        }
        catch (error:any){
            return res.status(500).json({ message: error.message});
        }
    }
    updateUserById = (req: Request, res: Response)=> {
        try{
            const userId = req.params.userid;
            const existingUser = userService.getOneUser(userId);
            if(!existingUser){
                return res.status(404).json({message: "User not found"});
            }
            const validation = CreateUserDTO.partial().safeParse(req.body);
            if(!validation.success){
                return res.status(404).json({error: validation.error});
            }
            const updatedUser = userService.updateUser(userId, validation.data);

            return res.status(200).json({
                message:"User updated Successfully",
                user:updatedUser

            });

        }
        catch(error:any){
            return res.status(500).json({ message: error.message ?? "Something went wrong" });
        }

    }
    deleteUserById = (req: Request, res: Response) => {
    try {
        const userId = req.params.userid;

        const existingUser = userService.getOneUser(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const deleted = userService.deleteUser(userId);

        if (!deleted) {
            return res.status(500).json({ message: "Failed to delete user" });
        }

        return res.status(200).json({
            message: "User deleted successfully",
            deletedUser: existingUser,
        });
    } 
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? "Something went wrong" });
    }
};


}