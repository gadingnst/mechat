import Firebase from 'firebase'
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} from 'react-native-dotenv'

const FirebaseSDK = () => {
    if (!Firebase.apps.length) {
        return Firebase.initializeApp({
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            databaseURL: FIREBASE_DATABASE_URL,
            projectId: FIREBASE_PROJECT_ID,
            storageBucket: FIREBASE_STORAGE_BUCKET,
            messagingSenderId: FIREBASE_SENDER_ID,
            appId: FIREBASE_APP_ID,
            measurementId: FIREBASE_MEASUREMENT_ID
        })
    }
    return Firebase.app()
}

export default FirebaseSDK()
