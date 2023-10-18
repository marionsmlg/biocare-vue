import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: `${import.meta.env.VITE_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_APP_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: `G-${import.meta.env.VITE_APP_MEASUREMENT_ID}`
}

export const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp)
