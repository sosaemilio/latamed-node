declare const express: any;
declare const bodyParser: any;
declare const cors: any;
declare const routes: any;
declare const mongodb: any;
declare const auth: any;
declare const app: any;
declare const port = 3000;
declare const config: {
    authRequired: boolean;
    auth0Logout: boolean;
    secret: string | undefined;
    baseURL: string | undefined;
    clientID: string | undefined;
    issuerBaseURL: string | undefined;
};
