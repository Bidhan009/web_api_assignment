import {z} from 'zod';
import { UserSchema } from '../types/user.types';

export const CreateUserDTO = UserSchema.pick({id: true, username: true, email: true, name: true, age:true})
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;