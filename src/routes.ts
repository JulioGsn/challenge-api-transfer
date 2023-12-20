import express, { Request, Response } from "express";
import { AppDataSource } from './config/db';
import { User } from "./entities/User.entity";

const router = express.Router();

const getUser = async (userId: number): Promise<User> | null => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    return user;
}

router.get('/users', (req: Request, res: Response) => {

    return res.status(200).json({ msg: "Api is alive" });
});

router.get('/users/:id/balance', async (req: Request, res: Response) => {
    const user = await getUser(parseInt(req.params.id));
    if(user === null) {
        return res.status(404).json({ error: 'User not found!' });
    }

    return res.status(200).json({ id: user.id, balance: user.balance });
});

router.get('/transfers', (req: Request, res: Response) => {
    return res.status(200).json({ msg: "Api is alive" });
});

router.post('/transfers', async (req: Request, res: Response) => {
    try {
        const { receiverId, payerId, value } = req.body;
        if(!receiverId) {
            throw new Error('No receiver ID present in the request');
        }
        if(!payerId) {
            throw new Error('No payer ID present in the request');
        }
        if(value == undefined || value == null) {
            throw new Error('No value present in the request');
        }

        const transferValue = parseFloat(value);

        const payer = await getUser(payerId);
        if(payer === null) {
            throw new Error('User not found');
        }

        if(payer.balance < transferValue) {
            throw new Error('Payer does not have enough balance: ' + value);
        }

        const receiver = await getUser(receiverId);
        if(receiver === null) {
            console.log("User not found: ", receiverId);
            throw new Error('User not found');
        }

        try {
            console.log(`Transferindo R$ ${value} de ${payer.id} para ${receiver.id}`);
            const newReceiverBalance = receiver.balance + transferValue;
            const newPayerBalance = payer.balance - transferValue;
            console.log("new balances", newReceiverBalance, newPayerBalance);

            const userRepository = AppDataSource.getRepository(User);
            await userRepository.update({ id: receiver.id }, { balance: newReceiverBalance });
            await userRepository.update({ id: payer.id }, { balance: newPayerBalance });
        } catch(err) {
            // TODO: Use transaction to treat errors
            console.log(err);
            throw err;
        }

        
        return res.status(200).json({ msg: "Transfer successfully done!" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ msg: 'Error' });
    }
});

export default router;
