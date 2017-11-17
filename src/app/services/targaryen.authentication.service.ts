/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { ConfigurationService, JwtHelper } from './';



@Injectable()
export class TargaryenAuthenticationService {

    private headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    private loginBody = {
        'data': {
            'email': this.configService.getProperty('HIHAuthConfig').userName,
            'password': this.configService.getProperty('HIHAuthConfig').password
        }
    };
    private loginUrl = `${this.configService.getProperty('FormioAppConfig').apiUrl}/user/login`;



    constructor(
        private configService: ConfigurationService,
        private http: HttpClient) { }



    getToken(): Observable<string> {

        let token: string = this.getTokenFromLocalStorage();

        if (token === null || token === undefined) {

            return this.login().map((t) => {

                if (t) {
                    return t;
                }
                Observable.throw('Login failed.');
            });
        } else {

            let jwtHelper: JwtHelper = new JwtHelper();
            //console.log('jwtHelper.decodeToken: ', jwtHelper.decodeToken(this.token));
            //console.log('jwtHelper.getTokenExpirationDate: ', jwtHelper.getTokenExpirationDate(this.token));
            //console.log('jwtHelper.isTokenExpired: ', jwtHelper.isTokenExpired(this.token));

            if (jwtHelper.isTokenExpired(token)) {

                return this.login().map((t) => {

                    if (t) {
                        return t;
                    }
                    Observable.throw('Login failed.');
                });
            } else {

                return Observable.of(token);
            }
        }
    }

    private getTokenFromLocalStorage(): string {

        const mdmUserToken = localStorage.getItem('MDMUserToken');
        if (mdmUserToken !== null) {
            const m = JSON.parse(mdmUserToken);

            if (m) {
                return m.token;
            }
            return null;
        }
    }

    private login(): Observable<string> {

        this.logout();

        return this.http.post(this.loginUrl, JSON.stringify(this.loginBody), { observe: 'response', headers: this.headers })
            .map(response => {

                let t = response.headers.get('x-jwt-token');
                if (t) {

                    localStorage.setItem('MDMUserToken', JSON.stringify({ username: 'MDMUser', token: t }));
                    return t;

                } else {
                    return null;
                }
            });
    }

    logout(): void {

        localStorage.removeItem('MDMUserToken');
    }
}
*/
