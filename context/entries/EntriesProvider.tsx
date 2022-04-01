import { FC, useReducer } from "react";

import { v4 as uuidv4 } from 'uuid';

import { Entry } from "../../interfaces";
import { EntriesContext } from './';
import { entriesReducer } from "./";


export interface EntriesState {
    entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'pending: Ut ut Lorem adipisicing irure esse amet sunt aliqua dolore deserunt sint cupidatat eu.',
            status: 'pending',
            createAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'in-progress: Minim nulla irure occaecat occaecat laborum ex.',
            status: 'in-progress',
            createAt: Date.now() - 1_000_000
        },
        {
            _id: uuidv4(),
            description: 'finished: Excepteur eu eiusmod enim veniam mollit culpa quis incididunt elit non occaecat officia.',
            status: 'finished',
            createAt: Date.now() - 100_000
        },
    ]
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