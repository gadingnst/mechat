import Firebase from '../../Config/FirebaseSDK'

export const login = data => ({
    type: 'LOGIN_USER',
    payload: new Promise(async (resolve, reject) => {
        try {
            const updates = {}
            await Firebase.auth().signInWithEmailAndPassword(
                data.email.trim().toLowerCase(),
                data.password
            )

            const user = Firebase.auth().currentUser
            const db = Firebase.database()

            const snapshot = (await db.ref('/contacts').once('value')).val()

            const usersSnapshots = Object.keys(snapshot).map(contactsId => {
                if (contactsId !== user.uid) {
                    if (snapshot[contactsId].hasOwnProperty(user.uid)) {
                        return `/contacts/${contactsId}/${user.uid}`
                    }
                }
                return false
            })

            usersSnapshots
                .filter(item => item)
                .forEach(item => {
                    updates[`${item}/status`] = true
                    updates[`${item}/deviceId`] = data.deviceId
                })

            updates[`/users/${user.uid}/status`] = true
            updates[`/users/${user.uid}/deviceId`] = data.deviceId

            await db.ref().update(updates)
            const userData = (await db
                .ref(`/users/${user.uid}`)
                .once('value')).val()

            resolve({
                id: user.uid,
                ...userData
            })
        } catch (err) {
            reject(err)
        }
    })
})

export const loginWithGoogle = () => ({
    type: 'LOGIN_USER',
    payload: new Promise((resolve, reject) => {
        // TODO
    })
})

export const updateUser = data => ({
    type: 'UPDATE_USER',
    payload: data
})

export const register = data => ({
    type: 'LOGIN_USER',
    payload: new Promise(async (resolve, reject) => {
        data = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
            deviceId: data.deviceId || null,
            avatar: `https://ui-avatars.com/api/?size=256&name=${data.name
                .trim()
                .replace(/\s+/, '+')}`,
            status: true
        }

        try {
            await Firebase.auth().createUserWithEmailAndPassword(
                data.email,
                data.password
            )

            const user = Firebase.auth().currentUser
            delete data.password

            await Firebase.database()
                .ref(`/users/${user.uid}`)
                .set({ id: user.uid, ...data })

            resolve({ id: user.uid, ...data })
        } catch (err) {
            reject(err)
        }
    })
})

export const logout = () => ({
    type: 'LOGOUT_USER',
    payload: new Promise(async (resolve, reject) => {
        const user = Firebase.auth().currentUser
        const db = Firebase.database()
        const updates = {}

        const contactSnapshots = (await db.ref('/contacts').once('value')).val()

        const usersSnapshots = Object.keys(contactSnapshots).map(contactsId => {
            if (contactsId !== user.uid) {
                if (contactSnapshots[contactsId].hasOwnProperty(user.uid)) {
                    return `/contacts/${contactsId}/${user.uid}`
                }
            }
            return false
        })

        usersSnapshots
            .filter(item => item)
            .forEach(item => {
                updates[`${item}/status`] = false
                updates[`${item}/deviceId`] = null
            })

        updates[`/users/${user.uid}/status`] = false
        updates[`/users/${user.uid}/deviceId`] = null

        db.ref()
            .update(updates)
            .then(() => Firebase.auth().signOut())
            .then(() => resolve())
            .catch(err => reject(err))
    })
})

export default { login, register, logout, loginWithGoogle }
