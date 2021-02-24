import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveysRepository } from "../repositories/SurveysRepository"

class SurveyController {
    async index(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)
        const allSurvey = await surveysRepository.find()
        return response.json([allSurvey])

    }

    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const surveysRepository = getCustomRepository(SurveysRepository)
        const survey = surveysRepository.create({
            title, description
        })
        await surveysRepository.save(survey)
        return response.json(survey)
    }

}
export { SurveyController }