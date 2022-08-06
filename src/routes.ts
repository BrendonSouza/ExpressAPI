import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
const authMiddleware = require("./utils/middleware/authMiddleware");
const route = require('express').Router();
const authController = new AuthController();

route.post('/signup',authController.SignUp);
route.post('/signin',authController.SignIn);

route.use(authMiddleware);
route.get('/', (req:any, res:any) => {
    res.json({"message":'Hello World!'});
})

export{route}