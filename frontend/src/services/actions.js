/**
 * @fileoverview actions.js permet de modifier les valeurs du store
 */


/**
 * permet de modifier la valeur de username dans le store
 * @param {string} username 
 * @returns {type: string, payload: string}
 */
export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username,
    };
};

/**
 * permet de modifier la valeur de room dans le store
 * @param {string} room
 * @returns {type: string, payload: string}
 */
export const setRoom = (room) => {
    return {
        type: 'SET_ROOM',
        payload: room,
    };
};

/**
 * permet à l'utilisateur de rejoindre un salon(room)
 * @param {string} room
 * @returns {type: string, payload: string}
 */
export const joinRoom = (room) => {
    return {
        type: 'JOIN_ROOM',
        payload: room,
    };
};

/**
 * permet à l'utilisateur d'envoyer un message dans un salon(room)
 * @param {string} room
 * @param {string} message
 * @returns {type: string, payload: {room: string, message: string}}
 */
export const sendMessage = (room, message) => {
    return {
        type: 'SEND_MESSAGE',
        payload: {
            room,
            message,
        },
    };
};
