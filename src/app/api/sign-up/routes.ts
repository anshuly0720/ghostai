import dbConnect from "@/app/lib/dbConnect";        
import UserModel from "@/app/models/user.models";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
import { success } from "zod";
import { signUpSchema } from "@/app/schemas/signUpSchema";


export async function POST(request:Request) {
    // db connected immediately
    await dbConnect();

    try {
        const {username,email,password} = await request.json()

        //checks exisiting verified user by username
        const existingUserVerifiedByUsername = await UserModel.
        findOne({
            username,
            isVerified: true
        })
        
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username alr taken"
              },{status:400}
            )
        }

        //check existing user by email
        const existingUserByEmail = await UserModel.
        findOne({
            email
        });
        
        //generates a 6 digit code
        const verifyCode = Math.floor(100000+Math.random()*900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User alr exists with this email"
                },{status:400})
            }else{
                //update existing unverified user
                const hashpassword = await bcrypt.hash(password,10);
                existingUserByEmail.password = hashpassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpires = expiryDate;
                await existingUserByEmail.save()
            }
        }else{
            //creates new user
            const hashpassword = await bcrypt.hash(password,10);
            const newUser = new UserModel({
                username,
                email,
                password:hashpassword,
                verifyCode,
                verifyCodeExpires:expiryDate,
                isVerified:false,
                isAcceptingMessages:true,
                messages:[]
            })

            await newUser.save()
        }

        //send verification email

        const emailResponse= await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered succesfully, please verify your email"
        },{status:201})


    } catch (error) {
        console.error("Error registering User", error);
        return Response.json(
        {
            success: false,
            message: "Error Registering User"
        },
        {
            status: 500
        }
    );
    }
}