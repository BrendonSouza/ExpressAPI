import { NextFunction, Response } from 'express';
import { Request } from 'express';
const jwt = require("jsonwebtoken");
module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).send({
            error:"No token provided"
        })
    } 
    jwt.verify(token,process.env.JWT_SECRET,(err:any, decoded:any)=>{
        if(err){
            return res.status(401).send({
                error: "Token invalid"
            })
        }
        req.body.userId =decoded.id;
        req.body.role = decoded.role
        return next();
    })

}