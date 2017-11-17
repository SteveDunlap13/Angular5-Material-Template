
import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';
import { AdalService } from 'ng2-adal/dist/core';

import { AppStore } from '../../store';
import { AppState } from '../../models';
import * as DtsActions from '../../store/actions';



@Component({
    selector: 'menu-contents',
    styleUrls: ['./menucontents.component.scss'],
    templateUrl: './menucontents.component.html'
})
export class MenuContentsComponent {

    private isSideMenuOpen: boolean;
    private signedIn = true;
    private isDarkTheme: boolean;


    constructor(
        @Inject(AppStore) private store: Store<AppState>,
        private adalService: AdalService) { }


    ngOnInit(): void {

        this.store.subscribe(() => this.readState());
        this.readState();

        //this.signedIn = this.adalService.userInfo.isAuthenticated;
    }


    private readState() {

        const state: AppState = this.store.getState() as AppState;
        this.isSideMenuOpen = state.isSideMenuOpen;
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
