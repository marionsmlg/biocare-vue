import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAhPjzK9O-DH3FLUGp3SYuzwWfgZ10wyTA',
  authDomain: `biocare-ac1f1.firebaseapp.com`,
  projectId: 'biocare-ac1f1',
  storageBucket: `biocare-ac1f1.appspot.com`,
  messagingSenderId: '899493293584',
  appId: '1:899493293584:web:2e7c97ad970719c7196495',
  measurementId: `G-LEHHMR2EE9`
}

export const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
