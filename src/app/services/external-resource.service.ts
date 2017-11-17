
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';



@Injectable()
export class ExternalResourceService {

    constructor(private http: HttpClient) { }


    // get resources for the application
    getExternalResources(baseUrl: string, filterKey: string, filterValue: string, limit: number): Observable<any> {

        let url = `${baseUrl}`;
        if (filterValue !== '') {
            url += `?${filterKey}=${filterValue}`;

            if (limit > 0) {
                url += `&_limit=${limit}`;
            }
        } else if (limit > 0) {
            url += `?_limit=${limit}`;
        }

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        return this.http.get(url, { headers: headers })

            .map(response => {

                console.log('getExternalResources() -> response: ', response);
                return response;
            });
    }
}
