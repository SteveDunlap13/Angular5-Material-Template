
import { InjectionToken } from '@angular/core';
import { createStore, Store, compose, StoreEnhancer } from 'redux';

import { AppState } from '../models';
import { dtsReducer as reducer } from './';



export const AppStore = new InjectionToken('App.store');


const devtools: StoreEnhancer<AppState> =
    window['devToolsExtension'] ?
        window['devToolsExtension']() : f => f;


export function createAppStore(): Store<AppState> {

    return createStore<AppState>(

        reducer,
        compose(devtools)
    );
}

export const AppStoreProviders = [

    { provide: AppStore, useFactory: createAppStore }
];
