// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getStorage,ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// @ts-ignore
import { v4  } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDo7yOMG6aMg5ycDeTQNjVpQYI_Dx3pcL0",

  authDomain: "ceacademy-storage.firebaseapp.com",

  projectId: "ceacademy-storage",

  storageBucket: "ceacademy-storage.appspot.com",

  messagingSenderId: "205699399572",

  appId: "1:205699399572:web:056ae9da9f907b88921981",

  measurementId: "G-XVT83YXJPR"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export const uploadFile = async (file: File) => {
  const ext = file.name.split('.')[1];
  const storageRef = ref(storage, `journals/${v4()}.${ext}`);
  const result = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return {result,url};
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log(snapshot)
  // })
}

export const ObjectDelete = async (refToFile: string) => {
  const storageRef = ref(storage, refToFile);
  const deleteObjectFn = await deleteObject(storageRef)
  return deleteObjectFn;
}
