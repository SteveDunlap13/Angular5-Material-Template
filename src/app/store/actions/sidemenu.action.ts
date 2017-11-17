
import { Action, ActionCreator } from 'redux';


export const SET_SIDE_MENU = 'Set side menu';
export interface SetSideMenu extends Action {
    isSideMenuOpen: boolean
}

export const setSideMenu: ActionCreator<SetSideMenu> =
    (value) => ({

        type: SET_SIDE_MENU,
        isSideMenuOpen: value
    });
