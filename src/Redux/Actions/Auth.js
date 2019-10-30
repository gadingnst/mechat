import Firebase from '../../Config/FirebaseSDK'

export const login = data => ({
    type: 'LOGIN_USER',
    payload: new Promise((resolve, reject) => {
        Firebase.auth()
            .signInWithEmailAndPassword(
                data.email.trim().toLowerCase(),
                data.password
            )
            .then(() => {
                const user = Firebase.auth().currentUser
                const dbRef = Firebase.database().ref(`/users/${user.uid}`)
                return dbRef
                    .update({ status: true })
                    .then(() => dbRef.once('value'))
                    .then(snapshot => ({
                        id: user.uid,
                        name: snapshot.name,
                        email: snapshot.email,
                        avatar: snapshot.avatar,
                        status: snapshot.status
                    }))
                    .catch(err => {
                        throw err
                    })
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
})

export const register = data => ({
    type: 'LOGIN_USER',
    payload: new Promise((resolve, reject) => {
        data = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
            avatar: `https://ui-avatars.com/api/?size=256&name=${data.name
                .trim()
                .replace(/\s+/, '+')}`,
            status: true
        }

        Firebase.auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                delete data.password
                const user = Firebase.auth().currentUser
                return Firebase.database()
                    .ref(`/users/${user.uid}`)
                    .set(data)
                    .then(() => ({ id: user.uid, ...data }))
                    .catch(err => {
                        throw err
                    })
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
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

export default { login, register, logout }
