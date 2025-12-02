import { z } from "zod";

export const acceptMessageSchema = z.object({
    acceptMessages:z.boolean()
})

//Purpose: A simple toggle. It ensures the frontend sends a real boolean (true/false) and not a string like "true" or null.