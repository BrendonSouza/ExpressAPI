//importamos os tipos Request e Response
import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
class UserController {
    async index(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository)
        const allUsers = await usersRepository.find()
        return response.json([allUsers])

    }
    async create(request: Request, response: Response) {
        const { name, email } = request.body
        //devemos criar um middleware para isolar o repo
        const usersRepository = getCustomRepository(UsersRepository)

        const userAlreadyExists = await usersRepository.findOne({
            email,
        })

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User Already exists! Email found in our database"
            })
        }

        const user = usersRepository.create({
            name, email
        })
        await usersRepository.save(user);
        return response.json(user)
    }


}
export { UserController }
//#jornadainfinita