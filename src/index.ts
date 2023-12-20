import { App } from './app';
import routes from './routes';
import { AppDataSource } from './config/db';

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch(err => {
        console.error("Error during Data Source initialization", err);
    });

const app = new App();

app.useRouter(routes);
app.start(3333);
