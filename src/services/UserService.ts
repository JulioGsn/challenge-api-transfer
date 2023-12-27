import { User } from "../entities/User.entity";

interface IUserRepository {
    findOneBy: (params: { id: number }) => Promise<User> | null;
}

export class UserService {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}
    getUser = async (userId: number): Promise<User> | null => {
        const user = await this.userRepository.findOneBy({ id: userId });
        return user;
    }
}
