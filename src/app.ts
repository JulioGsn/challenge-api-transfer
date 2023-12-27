import express, { Application, Router } from 'express';

export class App {
    public express: Application;

    constructor(routes: Router) {
        this.express = express();
        this.config();
        this.routes(routes);
    }

    config() {
        this.express.use(express.json());
    }

    routes(routes: Router) {
        this.express.use(routes);
    }

    listen(port: number): void {
        this.express.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    }
}
