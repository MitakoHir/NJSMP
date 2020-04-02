import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import DatabaseModule from './modules/Database';
import cors from 'cors';

class ExpressServer extends Server {

    private corsOptions: cors.CorsOptions = {
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: '*',
    };

    private readonly SERVER_STARTED = 'Express server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors(this.corsOptions));
        this.setupControllers();
    }

    private setupControllers(): void {
        const controllersInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                controllersInstances.push(new controller());
            }
        }
        super.addControllers(controllersInstances);
    }

    public start(port: number): void {
        this.app.get('*', (req: Request, res: Response) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
        DatabaseModule.testConnection();
    }

    /**
     * @remark for testing purposes only
     */
    public getApp() {
        return this.app;
    }
}
const exampleServer = new ExpressServer();
export default exampleServer;
