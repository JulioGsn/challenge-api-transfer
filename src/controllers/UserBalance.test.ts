import request from "supertest";
import { App } from "../app";
import routes from '../routes';
import { AppDataSource } from '../config/db';

describe('Get /users/{id}/balance', () => {
    let db = AppDataSource;
    let app: App;

    beforeAll(async () => {
        await db
        .initialize()
        .catch(err => {
            console.error("Error during Data Source initialization", err);
        });

        app = new App(routes);
    })
    
    afterAll(async () => {
        await db.destroy();
    });

    test('Should returns the balance for a specific user ID', async () => {
        const response = await request(app.express).get('/users/1/balance')
        expect(response.status).toBe(200);
    });

    test('Should returns 404 for User not found by ID', async () => {
        const notExistId = 10;
        const response = await request(app.express).get(`/users/${notExistId}/balance`)
        expect(response.status).toBe(404);
    });
})