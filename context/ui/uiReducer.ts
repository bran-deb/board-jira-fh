import { UIstate } from './';

//action creator functions
//UIActionType solo puede tener los tipos que ingresa en type
type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - isAddingEntry', payload: boolean }

export const uiReducer = (state: UIstate, action: UIActionType): UIstate => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return { ...state, sidemenuOpen: true }
        case 'UI - Close Sidebar':
            return { ...state, sidemenuOpen: false }
        case 'UI - isAddingEntry':
            return { ...state, isAddingEntry: action.payload }
        default:
            return state
    }
}