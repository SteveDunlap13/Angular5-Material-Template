
import { Injectable } from '@angular/core';


const CONFIG_DEV = require('../../app.config.dev.json');
//const CONFIG_TEST = require('../../app.config.test.json');
//const CONFIG_QA = require('../../app.config.qa.json');
//const CONFIG_PROD = require('../../app.config.prod.json');



@Injectable()
export class ConfigurationService {

    private config;

    constructor() {

        this.config = CONFIG_DEV;

        //console.log('process.env.ENV: ', process.env.ENV);
        /*
        if (process.env.ENV === 'production') {
            this.config = CONFIG_PROD;
        } else if (process.env.ENV === 'qa') {
            this.config = CONFIG_QA;
        } else if (process.env.ENV === 'test') {
            this.config = CONFIG_TEST;
        } else {
            this.config = CONFIG_DEV;
        }
        */
    }

    //get() {
    //  return this.config; //getProperty('title'); // <--- THIS GETS CALLED FIRST
    //}



    load(): Promise<any> {

        let promise = new Promise(resolve => setTimeout(resolve, 1));

        //let promise = this.http.get('./../../assets/config.json').map((res) => res.json()).toPromise();
        //promise.then(c => {
        //  this.config = c;     // <--- THIS RESOLVES AFTER
        //console.log(this.config);
        //});

        return promise;
    }




    public getProperty(property: string): any {

        if (!this.config) {
            throw new Error(`Attempted to access configuation property before
                                configuration data was loaded, please double check that 'APP_INITIALIZER is properly implemented.`
            );
        }

        if (!this.config[property]) {
            throw new Error(`Required property ${property} was not defined within the configuration object.
                                Please double check the assets/config.json file`);
        }

        return this.config[property];
    }
}
