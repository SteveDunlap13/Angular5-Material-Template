
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { ConfigurationService } from './configuration.service';
import { AdalService } from 'ng2-adal/dist/services/adal.service';



@Injectable()
export class DtsAdalService {

    private url: string;
    private headers: HttpHeaders;


    constructor(
        private configService: ConfigurationService,
        private http: HttpClient,
        private adalService: AdalService) { }



    public get adalConfig(): any {

        return {

            tenant: this.configService.getProperty('ADALTENANT'),
            clientId: this.configService.getProperty('ADALCLIENTID'),
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/'
        };
    }



    // bad code below, timing issues /w the observables; meant for reference only
    getGroupsTest(): Observable<any> {

        let token: string;
        let user: any;

        this.adalService.getUser().subscribe(u => {
            user = u;
        });
        this.adalService.acquireToken('https://graph.microsoft.com').subscribe(t => {
            token = t.toString();
        });


        this.headers = new HttpHeaders({
            'authorization': 'Bearer ' + token
        });


        let requestUrl = `https://graph.microsoft.com/v1.0/me/memberOf`;

        return this.http.get(requestUrl, { headers: this.headers })

            .map(response => {

                console.log('getGroupsTest() -> response: ', response);
                return response;
            });
    }
}
