
import { Component, Inject } from '@angular/core';
import { Store } from 'redux';

import { AppStore } from '../../store';
import * as DtsActions from '../../store/actions';
import { AppState } from '../../models';



@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


    constructor( @Inject(AppStore) private store: Store<AppState>) { }


    ngOnInit(): void {

        this.store.dispatch(DtsActions.setHeaderTitle('Dashboard'));
    }
}
