import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';


export interface UIstate {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIstate = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }
    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }
    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({ type: 'UI - isAddingEntry', payload: isAdding })
    }
    const startDragging = () => {
        dispatch({ type: 'UI - start dragging' })
    }
    const endDragging = () => {
        dispatch({ type: 'UI - end dragging' })
    }

    // cuando el state de un hook cambia se renderiza(state.sidemenuOpen)
    return (
        <UIContext.Provider value={
            {
                ...state,
                // sidemenuOpen: state.sidemenuOpen equivalente
                openSideMenu,
                closeSideMenu,
                //stateEntry
                setIsAddingEntry,
                //drag
                startDragging,
                endDragging,
            }
        }>
            {children}
        </UIContext.Provider>
    )
}