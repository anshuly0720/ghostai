import { z } from "zod";

export const verifySchema = z.object({
    code:z.string().length(6,{message:"Verification code must be 6 digits long"})
})

// Purpose: When a user enters the OTP (One Time Password).

// Logic: .length(6) ensures the user doesn't send a 5-digit or 7-digit code, preventing unnecessary database queries.