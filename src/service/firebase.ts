import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Tree } from '../types'

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

export const useTree = () => {
  const [tree, setTree] = useState<Tree | null>(null)

  useEffect(() => {
    const t = loadTree(setTree)

    return () => t()
  }, [])
  const addWater = () => {
    if (!tree) return
    const newWat = tree.wat + 1

    if (newWat >= 6) return
    saveTree({ ...tree, wat: newWat })
  }

  return [tree, addWater] as const
}

const getTreeRef = () => firebase.firestore().collection('tree').doc('v1')

export const loadTree = (setTree: (v: Tree) => void) => {
  return getTreeRef().onSnapshot((snap) => {
    if (!snap.exists) return

    const tree = snap.data() as Tree

    const someDay = new Date().getDate() === new Date(tree.lastWat).getDate()
    const finish = tree.gen >= 130
    const existsWat = tree.wat > 0

    console.log(tree)
    console.log({ someDay, finish, existsWat })

    if (!someDay && !finish && existsWat) {
      saveTree({
        ...tree,
        gen: tree.gen + 1,
        lastWat: +new Date(),
        wat: tree.wat - 1,
      })
    }
    setTree(tree)
  })
}

export const saveTree = (v: Tree) => getTreeRef().set(v)
