import { FC, useReducer } from "react";
import { EntriesContext } from './';
import { entriesReducer } from "./";


export interface EntriesState {
    entries: [];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);


    return (
        <EntriesContext.Provider value={{
            ...state
            //  entries: [],
        }}>
            {children}
        </EntriesContext.Provider>
    )
}