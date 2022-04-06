import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    //stateEntry
    setIsAddingEntry: (isAdding: boolean) => void
    //drag
    startDragging: () => void
    endDragging: () => void
}

export const UIContext = createContext({} as ContextProps)