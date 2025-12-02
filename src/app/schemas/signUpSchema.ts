import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username must be at least 2 characters long")
    .max(20,"Username must be less than 20 characters long")
    .regex(/^[a-zA-Z0-9]+$/,"Username must contain only letters and numbers")
    .trim(); //removes whitespace from start and end of the string


export const emailValidation = z
    .string()
    .email({message:"Invalid email address"})

export const passwordValidation = z
    .string()    
    .min(8,{message:"Password must be at least 8 characters long"})
    .max(32,{message:"Password must be less than 32 characters long"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"}
    )

export const signUpSchema = z.object({
    username:usernameValidation,
    email:emailValidation,
    password:passwordValidation,
})



// this file handles user registration.

// Modularity: You exported usernameValidation separately. This is smart because you might need to check just a username (e.g., during a "check availability" feature) without checking the whole form.

// emailValidation: Uses Zod's built-in email regex.

// passwordValidation: Uses a complex Regex to enforce security (One upper, one lower, one number, one special char).