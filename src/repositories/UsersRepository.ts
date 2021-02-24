import { EntityRepository, Repository } from "typeorm";

import { User } from "../models/User"
//notação pra informar a entidade
@EntityRepository(User)
class UsersRepository extends Repository<User>{

}
export { UsersRepository }