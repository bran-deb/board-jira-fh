import { FC, useEffect, useReducer } from "react";

import { useSnackbar } from 'notistack';

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

    const { enqueueSnackbar } = useSnackbar();

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
        //NOTE: mostrar snakbar
        enqueueSnackbar('Tarea agregada', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }

    const updateEntry = async (entry: Entry, showSnackbar = false) => {
        const { _id, description, status } = entry
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] - entry-updated', payload: data })
            //NOTE: mostrar snakbar
            if (showSnackbar)
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'info',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
        } catch (error) {
            console.log({ error });
        }
    }

    const deleteEntry = async (entry: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`)
            dispatch({ type: '[Entry] - entry-deleted', payload: data })
            refreshEntries()
            //NOTE: mostrar snakbar
            if (showSnackbar)
                enqueueSnackbar('Entrada Eliminada', {
                    variant: 'error',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
        } catch (error) {
            console.log({ error });
        }
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
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}