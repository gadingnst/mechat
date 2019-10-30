export const initChat = chats => ({
    type: 'INIT_CHAT',
    payload: chats
})

export const sendChat = (chat, receiver) => ({
    type: 'SEND_CHAT',
    payload: { chat, receiver }
})

export const receiveChat = (chat, sender) => {
    // TODO
}

export const clearAllChats = () => ({
    type: 'CLEAR_ALL_CHAT'
})
