import { EntriesState } from './';
import { Entry } from '../../interfaces';


//action creator function
type EntriesActionType =
    | { type: '[Entry] - Add-Entry', payload: Entry }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        default:
            return state
    }
}