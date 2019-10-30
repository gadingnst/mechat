import Firebase from '../../Config/FirebaseSDK'

export const login = data => ({
    type: 'LOGIN_USER',
    payload: new Promise(async (resolve, reject) => {
        try {
            await Firebase.auth().signInWithEmailAndPassword(
                data.email.trim().toLowerCase(),
                data.password
            )

            const user = Firebase.auth().currentUser
            const dbRef = Firebase.database().ref(`/users/${user.uid}`)
            await dbRef.update({ status: true })
            const snapshot = (await dbRef.once('value')).val()
            resolve({
                id: user.uid,
                name: snapshot.name,
                email: snapshot.email,
                avatar: snapshot.avatar,
                status: snapshot.status
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

export const register = data => ({
    type: 'LOGIN_USER',
    payload: new Promise(async (resolve, reject) => {
        data = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
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
                .set(data)

            resolve({ id: user.uid, ...data })
        } catch (err) {
            reject(err)
        }
    })
})

export const logout = () => ({
    type: 'LOGOUT_USER',
    payload: new Promise((resolve, reject) => {
        const user = Firebase.auth().currentUser
        Firebase.database()
            .ref(`/users/${user.uid}`)
            .update({ status: false })
            .then(() => Firebase.auth().signOut())
            .then(() => resolve())
            .catch(err => reject(err))
    })
})

export default { login, register, logout, loginWithGoogle }
