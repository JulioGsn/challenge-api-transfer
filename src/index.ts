import { App } from './app';
import routes from './routes';
import { AppDataSource } from './config/db';

const dbInit = async () => {
    await AppDataSource
    .initialize()
    .catch(err => {
        console.error("Error during Data Source initialization", err);
    });

    console.log("Data Source has been initialized!");
}

const startServer = async () => {
    await dbInit();

    const app = new App(routes);

    app.listen(3333);
}

startServer();
