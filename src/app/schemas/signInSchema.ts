import { z } from "zod";

export const signInSchema = z.object({
    identifier:z.string(),
    password:z.string()
})

//identifier: You named this "identifier" instead of "email" or "username". This is a great practice. It allows users to log in using either their username or their email.