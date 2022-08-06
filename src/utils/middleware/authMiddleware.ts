import { Response } from 'express';
import { Request } from 'express';
const jwt = require("jsonwebtoken");
module.exports = (req: Request, res: Response, next: any) => {
    //quando o user estiver pronto para ir pro prox, chama o next
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            error: "No token provided"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        
        if (err) {
            return res.status(401).send({
                error: "Token invalid",
                err
            })
        }
        req.body.userId = decoded.id;
        return next();
    })

}