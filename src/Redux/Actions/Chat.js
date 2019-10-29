export const sendChat = (chat, receiver) => ({
    type: 'SEND_CHAT',
    payload: { chat, receiver }
})

export const receiveChat = (chat, sender) => {
    // TODO
}
