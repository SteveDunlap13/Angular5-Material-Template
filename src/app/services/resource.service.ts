/*
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { ConfigurationService } from './configuration.service';
import { Resource, ResourceSubmission } from '../models';
import { TargaryenAuthenticationService } from './';

import { ComponentFactory } from '../resources/component.factory';



@Injectable()
export class ResourceService {

    private headers = new HttpHeaders();
    private loginBody: {};
    private loginUrl: string;


    constructor(
        private configService: ConfigurationService,
        private authenticationService: TargaryenAuthenticationService,
        private http: HttpClient) {

        this.headers
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        this.loginBody = {
            'data': {
                'email': this.configService.getProperty('HIHAuthConfig').userName,
                'password': this.configService.getProperty('HIHAuthConfig').password
            }
        };
        this.loginUrl = `${this.configService.getProperty('FormioAppConfig').apiUrl}/user/login`;
    }




    // get resources for the application
    getResources(): Observable<Resource[]> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let appTags = this.configService.getProperty('HIHResourceTags').app;

                // get all resources for hih
                let url = `${this.configService.getProperty('FormioAppConfig').apiUrl}/form?tags__in=${appTags}&limit=1000`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);


                return this.http.get(url, { headers: xHeaders })
                    .map((response: any) => {

                        return response.map(data => {

                            let formConfig = data.components.map(c => {

                                let factory = ComponentFactory.createComponent(c);
                                return factory.build();
                            });

                            let metadata = formConfig.filter(x => {

                                if (x.type === 'metadata') {

                                    return x.metadata;
                                }
                            });

                            return {
                                _id: data._id,
                                title: data.title,
                                name: data.name,
                                path: data.path,
                                modified: data.modified,
                                tags: data.tags,
                                data: data,
                                formConfig: formConfig,
                                metadata: metadata.length > 0 ? metadata[0].metadata : metadata.metadata
                            };

                        }) as Resource[];
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }


    // get resource routes for the application
    getResourceRoutes(): Observable<string[]> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let appTags = this.configService.getProperty('HIHResourceTags').app;

                // get all resources for hih
                let url = `${this.configService.getProperty('FormioAppConfig').apiUrl}/form?tags__in=${appTags}&limit=1000`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);


                return this.http.get(url, { headers: xHeaders })
                    .map((response: any) => {

                        return response.map(data => {

                            return data.path;

                        }) as string[];
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }


    getSubmission(url: string, id: string): Observable<ResourceSubmission> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let submissionUrl = `${url}/submission/${id}`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.get(submissionUrl, { headers: xHeaders })
                    .map((response: any) => {

                        return {
                            _id: response._id,
                            data: response.data
                        } as ResourceSubmission;
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }

    // get total count of submissions for a specific resource
    getSubmissionsCount(baseUrl: string): Observable<number> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let url = `${baseUrl}/submission?limit=1000`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.get(url, { headers: xHeaders })
                    .map((response: any[]) => {

                        return response.length;
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }

    // get paged submissions for a specific resource
    getSubmissions(url: string, sort: string, order: string, page: number, size: number): Observable<ResourceSubmission[]> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let submissionUrl = `${url}/submission?skip=${(page + 1) * size}&limit=${size}`;

                //TODO: code smell !!!
                if (order === 'desc') {
                    submissionUrl = submissionUrl + `&sort=-data.${sort}`;
                } else {
                    submissionUrl = submissionUrl + `&sort=data.${sort}`;
                }

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.get(submissionUrl, { headers: xHeaders })
                    .map((response: any[]) => {

                        return response.map(res => {

                            return {
                                _id: res._id,
                                data: res.data
                            } as ResourceSubmission;
                        }) as ResourceSubmission[];
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }





    // get submissions for a specific resource for dropdown component
    getSubmissionsForSelect(resourceId: string, filterKey: string, filterValue: string, limit: number): Observable<ResourceSubmission[]> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                let url = `${this.configService.getProperty('FormioAppConfig').apiUrl}/form/${resourceId}`;

                return this.http.get(url, { headers: xHeaders })
                    .map((response: any) => {

                        return response.path;
                    })
                    .flatMap((path: string) => {

                        url = `${this.configService.getProperty('FormioAppConfig').apiUrl}/${path}/submission`;
                        if (filterValue !== '') {
                            url += `?${filterKey}=${filterValue}`;

                            if (limit > 0) {
                                url += `&limit=${limit}`;
                            }
                        } else if (limit > 0) {
                            url += `?limit=${limit}`;
                        }

                        return this.http.get(url, { headers: xHeaders })

                            .map((response: any[]) => {

                                return response.map(res => {

                                    return {
                                        _id: res._id,
                                        data: res.data
                                    } as ResourceSubmission;
                                }) as ResourceSubmission[];
                            });
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }



    // add a new submission for a specific resource
    postSubmission(baseUrl: string, submission: any): Observable<number> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let url = `${baseUrl}/submission`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.post(url, JSON.stringify(submission), { observe: 'response', headers: xHeaders })
                    .map(response => {

                        return response.status;
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }

    // update a new submission for a specific resource
    putSubmission(baseUrl: string, submissionId: string, submission: any): Observable<number> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let url = `${baseUrl}/submission/${submissionId}`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.put(url, JSON.stringify(submission), { observe: 'response', headers: xHeaders })
                    .map(response => {

                        return response.status;
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }

    // update a new submission for a specific resource
    deleteSubmission(baseUrl: string, submissionId: string): Observable<number> {

        return this.authenticationService.getToken()
            .map((token: string) => {
                return token;
            })
            .flatMap((token: string) => {

                let url = `${baseUrl}/submission/${submissionId}`;

                let xHeaders = new HttpHeaders()
                    .set('Content-Type', 'application/json', )
                    .set('Accept', 'application/json')
                    .set('x-jwt-token', token);

                return this.http.delete(url, { observe: 'response', headers: xHeaders })
                    .map(response => {

                        return response.status;
                    })
                    .catch((error: Response) => Observable.throw(error));
            })
            .catch((error: Response) => Observable.throw(error));
    }
}
*/
