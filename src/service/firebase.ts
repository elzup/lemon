import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measumentId: process.env.FIREBASE_MEASUREMENT_ID,
}

const init = async () => {
  if (firebase.apps.length === 0) {
    await firebase.initializeApp(firebaseConfig)
    // firebase.analytics()
  }
}

export const getAuth = () => {
  init()

  const provider = new firebase.auth.GoogleAuthProvider()
  const auth = firebase.auth()

  if (typeof window !== undefined) {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  return {
    auth,
    login: () => auth.signInWithPopup(provider),
    logout: () => auth.signOut(),
  }
}

export const uploadGameImage = (name: string, file: File) => {
  init()

  return new Promise((resolve) =>
    firebase
      .storage()
      .ref()
      .child(`images`)
      .child(name)
      .put(file)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        resolve(true)
      })
  )
}
