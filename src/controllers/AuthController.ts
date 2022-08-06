import { Request, Response } from "express";
import { AppDataSource } from "../utils/db_connection";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
interface registerUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface userDTO {
    email: string;
    id: number
    name: string;
}

class AuthController {
    async SignUp(req: Request, res: Response) {
        const usersRepository = AppDataSource.getRepository("Users");
        const { name, email, password, confirmPassword } = req.body as registerUser;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            })
        }
        const user = await usersRepository.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({
                error: "User already exists"
            })
        }
         
        const newUser =  usersRepository.create({ name, email, password: await bcrypt.hash(password, 10) });
        await usersRepository.save(newUser);
        
        //return newUser withouth the password
        
      
        return res.status(201).json({
            message: "User created successfully",
            user: {...newUser, password: undefined}
        }) 
    }

    async SignIn(req: Request, res: Response) {
        const usersRepository = AppDataSource.getRepository("Users");
        const { email, password } = req.body;
        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                error: "User does not exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: "Invalid password or email"
            })
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {...user, password: undefined,token}
        })
    }

}
export { AuthController };