import { FC, useEffect, useReducer } from "react";

import { Entry } from "../../interfaces";
import { entriesApi } from "../../services";
import { EntriesContext } from './';
import { entriesReducer } from "./";


export interface EntriesState {
    entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    //postea un nuevo entry mandandole description
    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createAt: Date.now(),
        //     status: "pending"
        // }
        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - entry-updated', payload: entry })
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh-Data', payload: data })
    }
    //load data from db
    useEffect(() => {
        refreshEntries()
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            //  entries: [],

            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}