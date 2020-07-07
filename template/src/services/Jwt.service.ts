import {ConnectionService} from './Connection.service';

class Jwt {
    private resource: string = "";

    constructor() {
        this.resource = ConnectionService.getAuthPath();
    }

    public async getToken() {
        
        let response = await fetch(this.resource, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            credentials: 'include'
        });
        let data = await response.json();

        if (data == null) {
            console.error('Token request failed');
            return;
        }
        
        let token = data.token;
        localStorage.setItem('JWT', token);
    }

    public validateToken() {
        let token = localStorage.getItem('JWT');
        if (token && JSON.parse(atob(token.split('.')[1])).exp - 20 > new Date().getTime() / 1000) {
            return true;
        }
        return false;
    }

    public async loadToken() {
        if (!this.validateToken()) {
            await this.getToken();
        }
        return localStorage.getItem('JWT');
    }

    public getIdentity() {
        let token = localStorage.getItem('JWT');
        if (!token) {
            return null;
        }

        let payload = JSON.parse(atob(token.split('.')[1]));
        let identity: { [k: string]: any } = {};
        identity.username = payload.user;
        identity.permissions = payload.permissions;
        identity.userid = Number(payload.userid);

        return identity;
    }
}

export const JwtService = new Jwt();
