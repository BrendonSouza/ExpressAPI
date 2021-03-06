import { Router } from "express"
import { UserController } from "./controllers/UserController"
import { SurveyController } from "./controllers/SurveyController"
const router = Router()

const userController = new UserController()
const surveyController = new SurveyController()

router.post("/users", userController.create);
router.post("/surveys", surveyController.create)
router.get("/users", userController.index)
router.get("/surveys", surveyController.index)
router.get("/", (request, response) => {
    return response.json({ message: "hi" })
})
export { router }
