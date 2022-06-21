import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAScfKtiqwytYiIB_2rzhcEuBmqE67mGGw",
  authDomain: "viraj-chatbot.firebaseapp.com",
  projectId: "viraj-chatbot",
  storageBucket: "viraj-chatbot.appspot.com",
  messagingSenderId: "421610551439",
  appId: "1:421610551439:web:f1f6a630861574dfbf58fa",
  measurementId: "G-CXRBVXTNML"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
