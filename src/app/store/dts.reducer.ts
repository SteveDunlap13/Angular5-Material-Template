
import { Reducer, Action } from 'redux';

import * as DtsActions from './actions';
import { AppState } from '../models';



const initialState: AppState = {

    headerTitle: '',
    isDarkTheme: true,
    isSideMenuOpen: false
};


export const dtsReducer: Reducer<AppState> =

    (state: AppState = initialState, action: Action): AppState => {

        switch (action.type) {

            case DtsActions.SET_HEADER_TITLE:
                const title: string = (<DtsActions.SetHeaderTitle>action).headerTitle;
                return { ...state, headerTitle: title };


            case DtsActions.SET_IS_DARK_THEME:
                const isDarkTheme: boolean = (<DtsActions.SetIsDarkTheme>action).isDarkTheme;
                return { ...state, isDarkTheme: isDarkTheme };


            case DtsActions.SET_SIDE_MENU:
                const isSideMenuOpen: boolean = (<DtsActions.SetSideMenu>action).isSideMenuOpen;
                return { ...state, isSideMenuOpen: isSideMenuOpen };


            default:
                return state;
        }
    };
