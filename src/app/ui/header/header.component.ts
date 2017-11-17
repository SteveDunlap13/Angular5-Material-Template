
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/core';
import { Store } from 'redux';

import { AppStore } from '../../store';
import { AppState } from '../../models';
import * as DtsActions from '../../store/actions';
import { ConfigurationService } from '../../services';



@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    private isDarkTheme: boolean;
    private signedIn = true;
    private baseTitle: string;
    private title: string;



    constructor(
        @Inject(AppStore) private store: Store<AppState>,
        private configurationService: ConfigurationService,
        private adalService: AdalService) { }


    ngOnInit(): void {

        this.store.subscribe(() => this.readState());
        this.readState();

        this.baseTitle = this.configurationService.getProperty('title') + ' : ';
        //this.signedIn = this.adalService.userInfo.isAuthenticated;
    }



    private readState() {

        const state: AppState = this.store.getState() as AppState;
        this.title = state.headerTitle;
        this.isDarkTheme = state.isDarkTheme;
    }

    private changeTheme(): void {

        this.store.dispatch(DtsActions.setIsDarkTheme(!this.isDarkTheme));
    }

    private signIn(): void {

        //this.adalService.login();
    }

    private signOut(): void {

        //this.adalService.logOut();
    }
}
