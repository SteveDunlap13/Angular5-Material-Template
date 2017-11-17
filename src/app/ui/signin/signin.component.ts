
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from 'redux';

import { AppStore } from '../../store';
import { AppState } from '../../models';
import * as DtsActions from '../../store/actions';



@Component({
    selector: 'signin',
    styleUrls: ['./signin.component.scss'],
    templateUrl: 'signin.component.html'
})
@AutoUnsubscribe()
export class SignInComponent implements OnInit, OnDestroy {

    private signedIn = true;


    constructor(
        @Inject(AppStore) private store: Store<AppState>,
        private adalService: AdalService) { }


    ngOnInit(): void {

        this.store.dispatch(DtsActions.setHeaderTitle('Sign in'));

        //this.signedIn = this.adalService.userInfo.isAuthenticated;
    }
    ngOnDestroy(): void { }
}
