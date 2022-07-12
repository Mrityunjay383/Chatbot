import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgu6Ca2-hsCE9pITWrhaUiQpTl6oqyies",
  authDomain: "vaj-chat.firebaseapp.com",
  databaseURL: "https://vaj-chat-default-rtdb.firebaseio.com",
  projectId: "vaj-chat",
  storageBucket: "vaj-chat.appspot.com",
  messagingSenderId: "768327563726",
  appId: "1:768327563726:web:82f3b008be93992af2d39f"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
