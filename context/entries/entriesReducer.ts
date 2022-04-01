import { EntriesState } from './';


//action creator function
type EntriesActionType =
    | { type: '[ENTRIES] - ActionName' }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {

        default:
            return state
    }
}