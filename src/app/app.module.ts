
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AdalService } from 'ng2-adal/dist/core';

import { AppRoutes } from './app.routes'

import 'hammerjs';

import { ValyrianMaterialModule } from './material.module';

import { AppStoreProviders } from './store/app.store';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';

import {
  DashboardComponent,
  SignInComponent,
  MenuContentsComponent,
  SideMenuComponent,
  HeaderComponent,
  FxVersionComponent,
  Error404Component
} from './ui';

import {
  LoadingSpinnerComponent,
  DtsAdalService,
  ConfigurationService,
  //TargaryenAuthenticationService,
  //ResourceService,
  ExternalResourceService,
  LoadingSpinnerService
} from './services';




export function init(config: ConfigurationService) {
  return () => {
    return config.load();
  };
}



@NgModule({
  imports: [

    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ValyrianMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot(AppRoutes)
  ],

  declarations: [

    AppComponent,
    LoadingSpinnerComponent,
    SideMenuComponent,
    DashboardComponent,
    SignInComponent,
    MenuContentsComponent,
    HeaderComponent,
    FxVersionComponent,
    Error404Component
  ],

  exports: [

  ],

  providers: [

    AppStoreProviders,
    {
      'provide': APP_INITIALIZER,
      'useFactory': init,
      'deps': [ConfigurationService],
      'multi': true
    },
    ConfigurationService,
    //TargaryenAuthenticationService,
    LoadingSpinnerService,
    AuthGuard,
    AdalService,
    DtsAdalService,
    //ResourceService,
    ExternalResourceService
  ],

  entryComponents: [

    LoadingSpinnerComponent,
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
