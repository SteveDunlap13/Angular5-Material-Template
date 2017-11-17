
import { Component, Inject, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/services/adal.service';
import { Store } from 'redux';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { AppStore } from './store';
import { AppState } from './models';
import * as DtsActions from './store/actions';
import { DtsAdalService, ConfigurationService } from './services';



@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./css/groot-material.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  private isSideMenuOpen: boolean;
  private isDarkTheme: boolean;
  private title: string;
  private signedIn = true;



  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private configService: ConfigurationService,
    private adalService: AdalService,
    private dtsAdalService: DtsAdalService,
    private media: ObservableMedia) { }


  ngOnInit(): void {

    this.title = this.configService.getProperty('title');

    this.store.subscribe(() => this.readState());
    this.readState();

    //this.configAdal();
  }

  ngAfterViewInit() {

    this.media.subscribe((change: MediaChange) => {

      if (change.mediaQuery.indexOf('orientation') > -1) {
        return;
      }

      if (change.mqAlias === 'xs') {

        this.isSideMenuOpen = false;
        this.store.dispatch(DtsActions.setSideMenu(this.isSideMenuOpen));
      }
    });
  }


  private readState() {

    const state: AppState = this.store.getState() as AppState;
    this.isDarkTheme = state.isDarkTheme;
    this.isSideMenuOpen = state.isSideMenuOpen;
  }

  private configAdal() {

    this.adalService.init(this.dtsAdalService.adalConfig);
    this.adalService.handleWindowCallback();
    this.adalService.getUser();

    this.signedIn = this.adalService.userInfo.isAuthenticated;
  }
}
