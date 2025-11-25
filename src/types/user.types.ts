import {z} from 'zod';

export const UserSchema = z.object({
    id: z.string().min(1, "User ID is required"),
    username: z.string().min(1,"Username is required"),
    email: z.string().min(1, "email is required"),
    name: z.string().min(1, "name is required"),
    age: z.number().min(1, "age is required"),
});

export type User = z.infer<typeof UserSchema>;