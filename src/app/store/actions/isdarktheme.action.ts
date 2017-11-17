
import { Action, ActionCreator } from 'redux';


export const SET_IS_DARK_THEME = 'Set is dark theme';
export interface SetIsDarkTheme extends Action {
    isDarkTheme: boolean
}

export const setIsDarkTheme: ActionCreator<SetIsDarkTheme> =
    (value) => ({

        type: SET_IS_DARK_THEME,
        isDarkTheme: value
    });
