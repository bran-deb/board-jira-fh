import { EntriesState } from './';
import { Entry } from '../../interfaces';


//action creator function
type EntriesActionType =
    | { type: '[Entry] - Add-Entry', payload: Entry }
    | { type: '[Entry] - entry-updated', payload: Entry }
    | { type: '[Entry] - entry-deleted', payload: Entry }
    | { type: '[Entry] - Refresh-Data', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] - entry-updated':
            return {
                ...state, entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status
                        entry.description = action.payload.description
                        // return action.payload
                    }
                    return entry
                })
            }
        case '[Entry] - entry-deleted':
            return {
                ...state, entries: state.entries.filter(entry => entry._id !== action.payload._id)
            }
        case '[Entry] - Refresh-Data':
            return {
                ...state,
                entries: [...action.payload]
            }
        default:
            return state
    }
}