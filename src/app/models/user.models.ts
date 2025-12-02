import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{  //typescript specific definitions
    content:string;
    createdAt:Date
}

const messageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpires:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[];
}


const userSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim: true, // removes whitespace from start and end of the string
        unique: true
    },
    email:{
        type:String,
        required: [true,"Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], //regex ensures email is valid
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verification code is required"],
    },
    verifyCodeExpires:{
        type:Date,
        required:[true,"Verification code expiration date is required"],
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        required:true,
        default:false,
    },
    messages:[messageSchema] //array of messages
},{timestamps:true}) //timestamps:true adds createdAt and updatedAt fields to the schema

const UserModel = (mongoose.models.User as mongoose.  //crucial step to ensure type safety
    Model<User>) || mongoose.model<User>("User",userSchema);  //Next.js runs in a "serverless" or "hot-reload" environment. Every time you save a file, the code re-runs. If you just used mongoose.model(), Next.js would try to define the model "User" twice and crash with an OverwriteModelError.

export default UserModel;
