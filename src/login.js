import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

let loginDiv = document.querySelector('#login-div')
let signUpDiv = document.querySelector('#signup-div')
let signInSubmit = document.querySelector('#sign-in-button')
let signUpSubmit = document.querySelector('#sign-up-button')
let signInForm = document.querySelector('#sign-in-form')
let signUpForm = document.querySelector('#sign-up-form')
let signInCancel = document.querySelector('#sign-in-cancel')
let signUpCancel = document.querySelector('#sign-up-cancel')

const firebaseConfig = {
    apiKey: "AIzaSyCYNaTdvRzTxmDMZlc_Qrl95ULlsYcPX9k",
    authDomain: "todoappadil.firebaseapp.com",
    projectId: "todoappadil",
    storageBucket: "todoappadil.appspot.com",
    messagingSenderId: "343612051830",
    appId: "1:343612051830:web:40c5b6752b92d248ca6a57"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

signUpSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('sign up clicked')
    createUserWithEmailAndPassword(auth, signUpForm[0].value, signUpForm[1].value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        

          console.log(error.code)
    
      });
})

signInSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('sign up clicked')
    signInWithEmailAndPassword(auth, signInForm[0].value, signInForm[1].value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
          console.log(error.code)
        });
    
}) 
signInCancel.addEventListener('click',(e)=>{
    e.preventDefault()
    loginDiv.parentElement.style.display = 'flex',
    signInForm.style.display = 'none'
})
signUpCancel.addEventListener('click',(e)=>{
    e.preventDefault()
    signUpDiv.parentElement.style.display = 'flex',
    signUpForm.style.display = 'none'
})
loginDiv.addEventListener('click',()=>{
    loginDiv.parentElement.style.display = 'none',
    signInForm.style.display = 'flex'
})
signUpDiv.addEventListener('click',()=>{
    signUpDiv.parentElement.style.display = 'none',
    signUpForm.style.display = 'flex'
})