import Firebase from 'firebase'

const FirebaseSDK = () => {
    if (!Firebase.apps.length) {
        return Firebase.initializeApp({
            apiKey: 'AIzaSyCcPnWn7PkPx4WyVMX7Rj9MC6P_bE9K_1U',
            authDomain: 'mechat-f593b.firebaseapp.com',
            databaseURL: 'https://mechat-f593b.firebaseio.com',
            projectId: 'mechat-f593b',
            storageBucket: 'mechat-f593b.appspot.com',
            messagingSenderId: '320063284128',
            appId: '1:320063284128:web:57f75839ad8102235a7ac5',
            measurementId: 'G-5TS9CQ0ZVE'
        })
    }
    return Firebase.app()
}

export default FirebaseSDK()
