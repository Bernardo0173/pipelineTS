import express, { Application } from 'express';

interface ServerOptions {
    port: number;
    env: string;
    middlewares: any[];
    controllers: any[];
}

class Server {
    private app: Application;
    private port: number;
    private env: string;

    constructor(options: ServerOptions) {
        this.app = express();
        this.port = options.port;
        this.env = options.env;

        this.initializeMiddlewares(options.middlewares);
        this.initializeControllers(options.controllers);
    }

    private initializeMiddlewares(middlewares: any[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in ${this.env} mode on port ${this.port}`);
        });
    }
}

export default Server;
