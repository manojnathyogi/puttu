import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAx2nCdM-nxmWX-gxaluJBoWklKDaPifLo',
  authDomain: 'puttumuttu-b1cb0.firebaseapp.com',
  projectId: 'puttumuttu-b1cb0',
  storageBucket: 'puttumuttu-b1cb0.firebasestorage.app',
  messagingSenderId: '186951344370',
  appId: '1:186951344370:web:8b94b63af1724d55a5b06b',
  measurementId: 'G-BKXJDCEPT7'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
