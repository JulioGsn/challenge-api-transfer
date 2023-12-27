import { Request, Response } from "express";
import { User } from "./../entities/User.entity";

type TypeUserBalance = { id: number, balance: number }
import { AppDataSource } from '../config/db';

const getUser = async (userId: number): Promise<User> | null => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    return user;
}

class UserBalance {
    public async get(req: Request, res: Response) {
        try {
            const user = await getUser(parseInt(req.params.id));
            if(user === null) {
                return res.status(404).json({ error: 'User not found!' });
            }
    
            return res.status(200).json({ id: user.id, balance: user.balance });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: 'Server error!' });
        }
    }
}

export default new UserBalance;