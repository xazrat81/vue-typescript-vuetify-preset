const resource = require('../../public/resource.js').resource

const rootUrl: string = resource;
const authPath: string = 'http://localhost/api/authorization';

class Connection {

    constructor() {
    }

    public getRootUrl(): string {
        return rootUrl;
    }

    public getAuthPath(): string {
        return authPath;
    }
}

export const ConnectionService = new Connection();
