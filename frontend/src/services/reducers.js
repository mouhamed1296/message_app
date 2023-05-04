/**
 * @fileoverview reducers pour modifier les valeurs du store en fonction des actions
 */

/**
 * Etat initial du store
 * @typedef {Object} State
 * @property {string} username
 * @property {string} room
 * @property {string[]} messages
 */
const initialState = {
    username: '',
    room: '1',
    messages: [],
};

/**
 * Reducer qui modifie les valeurs du store en fonction des actions
 * @param {username: string, room: string, messages: string[]} state 
 * @param {type:string, payload: string} action 
 * @returns {username: string, room: string, messages: string[]}
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload,
            };
        case 'SET_ROOM':
            return {
                ...state,
                room: action.payload,
            };
        case 'JOIN_ROOM':
            return {
                ...state,
                messages: [],
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
            };
        default:
            return state;
    }
};

export default rootReducer;
