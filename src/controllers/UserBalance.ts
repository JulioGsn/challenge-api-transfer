import { Request, Response } from "express";
import { User } from "./../entities/User.entity";

import { AppDataSource } from '../config/db';
import { UserService } from "../services/UserService";

class UserBalance {
    public async get(req: Request, res: Response) {
        const userRepository = AppDataSource.getRepository(User);
        try {
            const userService = new UserService(userRepository);
            const user = await userService.getUser(parseInt(req.params.id));
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