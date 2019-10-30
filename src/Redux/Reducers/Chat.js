const initial = {
    data: []
}

export default (state = initial, action) => {
    let newState, index

    switch (action.type) {
        case 'INIT_CHAT':
            return {
                ...state,
                data: action.payload
            }
        case 'CLEAR_ALL_CHAT':
            return {
                ...state,
                data: []
            }
        case 'SEND_CHAT':
            newState = [...state.data]
            index = state.data.findIndex(
                ({ user }) => user.id === action.payload.receiver.id
            )
            newState[index].chats = action.payload.chats
            return {
                ...state,
                data: newState
            }
        case 'RECEIVE_CHAT':
            return {
                ...state
            }
        default:
            return state
    }
}
