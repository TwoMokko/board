import { z } from 'zod';

export const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    avatar: z.string().nullable().optional(),
    email: z.string(),
    created_at: z.string()
})

export const usersArraySchema = z.array(userSchema)

export type User = z.infer<typeof userSchema>
export type UsersArray = z.infer<typeof usersArraySchema>


