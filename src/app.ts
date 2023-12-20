import express, { Application, Router } from 'express';

export class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(express.json());
    }

    useRouter(routes: Router) {
        this.app.use(routes);
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    }
}
