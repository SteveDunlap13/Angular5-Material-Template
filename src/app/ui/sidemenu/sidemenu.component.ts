
import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';

import { AppStore } from '../../store';
import { AppState } from '../../models';
import * as DtsActions from '../../store/actions';



@Component({
    selector: 'side-menu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SideMenuComponent implements OnInit {

    private isSideMenuOpen: boolean;


    constructor( @Inject(AppStore) private store: Store<AppState>) { }


    ngOnInit(): void {

        this.store.subscribe(() => this.readState());
        this.readState();
    }


    private readState() {

        const state: AppState = this.store.getState() as AppState;
        this.isSideMenuOpen = state.isSideMenuOpen;
    }

    private toggleSideMenu() {

        this.store.dispatch(DtsActions.setSideMenu(!this.isSideMenuOpen));
    }
}
