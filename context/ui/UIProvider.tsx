import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';


export interface UIstate {
    sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIstate = {
    sidemenuOpen: false,
}

export const UIProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }
    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    // cuando el state de un hook cambia se renderiza(state.sidemenuOpen)
    return (
        <UIContext.Provider value={
            {
                ...state,
                // sidemenuOpen: state.sidemenuOpen equivalente
                openSideMenu,
                closeSideMenu,
            }
        }>
            {children}
        </UIContext.Provider>
    )
}