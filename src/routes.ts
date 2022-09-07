import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
const authMiddleware = require("./utils/middleware/authMiddleware");
const route = require('express').Router();
const authController = new AuthController();
const multer = require("multer");
const multerConfig = require("./utils/multer_connection");

route.post('/signup',authController.SignUp)
route.post('/signin',authController.SignIn)

//Rotas Protegidas
route.post('/postFile',[multer(multerConfig).single("file")],authController.PostFile)
route.get('/', (req:any,res:any)=>{
    res.json({message:"Hello World"})
})

export{route}