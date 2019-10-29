import { GiftedChat } from 'react-native-gifted-chat'

const { append, prepend } = GiftedChat

const initial = {
    data: [
        {
            user: {
                id: 1,
                name: 'Sutan Nasution.',
                status: true,
                number: '+6289665813871',
                email: 'sutan.gnst@gmail.com',
                biodata: 'At the home',
                avatar:
                    'https://sutanlab.id/assets/img/collections/sutan_new.jpeg'
            },
            chats: [
                {
                    id: 1,
                    createdAt: new Date(),
                    text: 'Hei Bros.',
                    user: {
                        name: 'Sutan Nasution.',
                        avatar:
                            'https://sutanlab.id/assets/img/collections/sutan_new.jpeg'
                    }
                }
            ]
        },
        {
            user: {
                id: 2,
                name: 'Rina Mardiana',
                status: false,
                number: '+6289668067427',
                email: 'rinamardiana099@gmail.com',
                biodata: 'At the Movies',
                avatar:
                    'https://instagram.fcgk18-1.fna.fbcdn.net/vp/3152008e1601f9e370d7935206cb5619/5E577E44/t51.2885-15/e35/s1080x1080/65922090_2367583833323057_3899391724464983981_n.jpg?_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=105'
            },
            chats: [
                {
                    id: 1,
                    createdAt: new Date(),
                    text: 'Hei Honey ❤️',
                    user: {
                        name: 'Rina Mardiana',
                        avatar:
                            'https://instagram.fcgk18-1.fna.fbcdn.net/vp/3152008e1601f9e370d7935206cb5619/5E577E44/t51.2885-15/e35/s1080x1080/65922090_2367583833323057_3899391724464983981_n.jpg?_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=105'
                    }
                }
            ]
        }
    ]
}

export default (state = initial, action) => {
    let newState, index

    switch (action.type) {
        case 'SEND_CHAT':
            newState = [...state.data]
            index = state.data.findIndex(
                ({ user }) => user.id === action.payload.receiver.id
            )
            newState[index].chats = append(
                newState[index].chats,
                action.payload.chat
            )
            return {
                ...state,
                data: newState
            }
        case 'RECEIVE_CHAT':
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
