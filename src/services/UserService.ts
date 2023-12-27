import { User } from "../entities/User.entity";

export class UserService {
    constructor(
        private readonly userRepository: any
    ) {}
    getUser = async (userId: number): Promise<User> | null => {
        const user = await this.userRepository.findOneBy({ id: userId });
        return user;
    }
}
