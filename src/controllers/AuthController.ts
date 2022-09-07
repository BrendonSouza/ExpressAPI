import { Request, Response } from "express";
import { AppDataSource } from "../utils/db_connection";

const mailer = require("../utils/email_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

interface registerUser{
    name: string;
    email:string;
    role:string
    password:string;
    confirmPassword:string;

}


class AuthController {
    
    async SignUp(req:Request,res:Response){
        const repository = AppDataSource.getRepository("Users");
        const {name,email,role,password,confirmPassword} = req.body as registerUser;
        
        if(password != confirmPassword){
            return res.status(400).json({
                error: "Passwords do not match"
            })
        }
        const user = await repository.findOne({where:{email}});
        if(user){
            return res.status(400).json({
                error: "User already exists"
            })
        }
        const newUser = repository.create({name,email,role,password: await bcrypt.hash(password,10)})
        await repository.save(newUser)

        return res.status(201).json({
            message:"User created successfully",
            user:{...newUser, password:undefined }
        })


    }
    async SignIn(req:Request,res:Response){
        const repository = AppDataSource.getRepository("Users");
        const {email,password} = req.body;
        const user = await repository.findOne({where:{email}});
        if(!user){
            return res.status(404).json({
                error: "User does not exists"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                error: "Invalid password or email"
            })
        }
        const token = jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET,{expiresIn: "24h"})
        return res.status(200).json({
            message:"User logged in successfully",
            user:{...user,password:undefined, token}
        })
    }

    async PostFile(req:any,res:Response){
        const { originalname: name, size, key, } = req.file;
        const url = req.url = `http://localhost:3000/files/${key}`;
        const repository = AppDataSource.getRepository("Files");
        const newFile = repository.create({ name, size, key, url });
        await repository.save(newFile);
        return res.status(201).json({
            message:"File uploaded successfully",
            file:{newFile}
        })

    }



}
export { AuthController };