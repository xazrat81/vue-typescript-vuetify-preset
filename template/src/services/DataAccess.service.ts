import {JwtService} from './Jwt.service';

class DataAccess {

    private withToken: boolean = false;
    private headers: { [k: string]: any } = {};

    constructor() {
        this.setDefaultHeaders();
    }

    public async get(resource: string) {
        return await this._request(resource, 'GET');
    }

    public async post(resource: string, payload: Object) {
        return await this._request(resource, 'POST', payload);
    }

    public async put(resource: string, payload: Object) {
        return await this._request(resource, 'PUT', payload);
    }

    public async patch(resource: string, payload: Object) {
        return await this._request(resource, 'PATCH', payload);
    }

    public async delete(resource: string) {
        return await this._request(resource, 'DELETE');
    }

    private async _request(resource: string, method: string, payload: Object | null = null) {
        let options: { [k: string]: any } = {};

        if (payload != null) {
            options.body = JSON.stringify(payload);
        }
        options.method = method;

        if (this.withToken) {
            await this.handleToken();

        } else {
            this.setDefaultHeaders();
            options.credentials = 'include';
        }

        options.headers = this.headers;

        let response = await fetch(resource, options);

        // if (response.status === 403 || response.status === 404 || response.status === 500) {
        //     throw new Error(`${response.status} - ${response.statusText}`);
        // }

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message);
        }

        if (response.status === 204) return;

        try {
            return await response.json();
        } catch(err) {
            console.error(err);
            return;
        }
    }

    private setBearer(token: string) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    private setDefaultHeaders() {
        this.headers = {};
        this.headers['Accept'] = 'application/json';
        this.headers['Content-Type'] = 'application/json';
    }

    public async handleToken() {

        let token = await JwtService.loadToken();

        if (token) {
            this.setBearer(token);
        }
    }
}

export const DataAccessService = new DataAccess();
