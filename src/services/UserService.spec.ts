import { UserService } from "./UserService";
import { User } from "../entities/User.entity";

interface IUserRepository {
    findOneBy: (params: { id: number }) => Promise<User> | null;
}

const mockUsers = [
    {
        id: 0,
        name: 'Júlio',
        balance: 100,
    },
    {
        id: 99,
        name: 'Abraão',
        balance: 0,
    },
]

class fakeUserRepository implements IUserRepository {
    async findOneBy(params: { id: number }) {
        return mockUsers.find(u => u.id === params.id) || null;
    };
}

describe('Unit test UserService', () => {
    test('Should returns the user for a specific user ID', async () => {
        const userRepository: IUserRepository = new fakeUserRepository();
        const userService = new UserService(userRepository);
        const user = await userService.getUser(0);

        expect(user).toEqual({
            id: 0,
            name: 'Júlio',
            balance: 100,
        });
    });

    test('Should returns null for not finding any user by ID', async () => {
        const userRepository: IUserRepository = new fakeUserRepository();
        const userService = new UserService(userRepository);
        const user = await userService.getUser(12);
        
        expect(user).toBeNull();
    });
})