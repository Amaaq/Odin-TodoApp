import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import {auth,db} from './app'
import {collection, addDoc } from "firebase/firestore";





let signInSubmit = document.querySelector('#sign-in-button')
let signUpSubmit = document.querySelector('#sign-up-button')
let signInForm = document.querySelector('#sign-in-form')
let signUpForm = document.querySelector('#sign-up-form')
let signUpCancel = document.querySelector('#sign-up-cancel')
let signUpDiv = document.querySelector('#signup-div')
let signUpError = document.querySelector('#sign-up-error')
let signInError = document.querySelector('#sign-in-error')
let signUpSuccess = document.querySelector('#sign-up-success')
let loginSuccess = document.querySelector('#login-success')


// const firebaseConfig = {
//     apiKey: "AIzaSyCYNaTdvRzTxmDMZlc_Qrl95ULlsYcPX9k",
//     authDomain: "todoappadil.firebaseapp.com",
//     projectId: "todoappadil",
//     storageBucket: "todoappadil.appspot.com",
//     messagingSenderId: "343612051830",
//     appId: "1:343612051830:web:40c5b6752b92d248ca6a57"
//   };
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth();

document.addEventListener('DOMContentLoaded',()=>{
    if(signInForm != null){
        signUpSubmit.addEventListener('click',(e)=>{
            e.preventDefault()
            createUserWithEmailAndPassword(auth, signUpForm[0].value, signUpForm[1].value)
            .then((userCred) => {
                addDoc(collection(db, "users"), {
                      userId: userCred.user.uid,
                      projects: "",
                    });
                signUpSuccess.style.display = 'block'
                signUpForm.style.display = 'none'
              })
              .catch((error) => {
                  signUpError.textContent =  error.code.slice(5).replaceAll('-',' ')
              });
        })
        
        signInSubmit.addEventListener('click',(e)=>{
            e.preventDefault()
            signInWithEmailAndPassword(auth, signInForm[0].value, signInForm[1].value)
                .then(() => {
                    window.open('./todo.html','_self')
                })
                .catch((error) => {
                    signInError.textContent =  error.code.slice(5).replaceAll('-',' ')
                });
            
        }) 
        signUpCancel.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'none'
        })
        loginSuccess.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpSuccess.style.display = 'none'
        })
        signUpDiv.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'flex'
        })
    }
})