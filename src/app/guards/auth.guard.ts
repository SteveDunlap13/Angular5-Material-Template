
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AdalService } from 'ng2-adal/dist/core';



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private adalService: AdalService,
        private router: Router) { }


    canActivate() {

        if (this.adalService.userInfo.isAuthenticated) {

            //console.log(JSON.stringify(this.adalService));
            //console.log(JSON.stringify(this.adalService.userInfo));

            return true;
        } else {

            this.router.navigate(['/signin']);
            return false;
        }
    }
}
