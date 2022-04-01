import { createContext } from 'react';


interface ContextProps {
    entries: [] //tipo de dato array?
}


export const EntriesContext = createContext({} as ContextProps)