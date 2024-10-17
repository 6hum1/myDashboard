// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"
  import{getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCVXluGWVBP2TAaae01sp16qHpUB3bUwGM",
    authDomain: "gdscdashboard-fb0ef.firebaseapp.com",
    projectId: "gdscdashboard-fb0ef",
    storageBucket: "gdscdashboard-fb0ef.appspot.com",
    messagingSenderId: "830763727828",
    appId: "1:830763727828:web:3226fa5afee0ece8c7b441"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const form = document.getElementById("form");

const fname = document.getElementById('fname');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const repeatpass = document.getElementById('repeatPassword');
const errmsg = document.getElementById('error-message');

function showMessage(message,divId){
    let messagediv = document.getElementById(divId);
    messagediv.style.display = "block";
    messagediv.innerText = message;
    messagediv.style.opacity = 1 ;  
    setTimeout(()=>{
        messagediv.style.opacity = 0 ; 
    },5000);
}
form.addEventListener("submit",(e)=>{

    e.preventDefault();
    let errors = [];

    const isSignupForm = fname && fname.value;

    
    if(isSignupForm){
        errors = getSignUpFormErrors(fname.value,email.value,pass.value,repeatpass.value);
    }
    else{
        errors = getLoginFormErrors(email.value,pass.value);
    }

    if(errors.length > 0){
        errmsg.innerText = errors.join(".");
    }
    else{
        
        if(isSignupForm){
            const auth = getAuth();
            const db = getFirestore();

            createUserWithEmailAndPassword(auth,email.value,pass.value)
            .then((userCredential)=>{
                const user = userCredential.user;
                const userData = {
                    email : email.value,
                    firstName : fname.value
                };
                showMessage("Account created successfully","signUp");
                const docRef = doc(db,"users",user.uid);
                setDoc(docRef,userData)
                .then(()=>{
                    window.location.href = "login.html";    
                })
                .catch((e)=>{
                    console.error("error writing document",e);
                });
            })
            .catch((e)=>{
                const errorCode = e.code;
                if(errorCode == 'auth/email-already-in-use'){
                    showMessage("Email address already taken !","signUp");
                }
                else{
                    showMessage("Enable to create user.","signUp");
                }
            })
        }
        else{
            const auth = getAuth();
            signInWithEmailAndPassword(auth,email.value,pass.value)
            .then((userCredential)=>{

                showMessage("Login is Successful","login");
                const user = userCredential.user;
                console.log("User logged in: ", user);
                localStorage.setItem("loggedInUserId",user.uid);
                window.location.href = "myDashboard.html";
            })
            .catch((e)=>{
                const errorCode = e.code ; 
                if (errorCode === "auth/wrong-password") {
                    showMessage("Incorrect Email or Password", "login");
                } else if (errorCode === "auth/user-not-found") {
                    showMessage("Your account doesn't exist", "login");
                }
                else{
                    showMessage("Your account doesn't exist","login");
                }
            })
        }
    }
})

console.log("Form submit event listener working");

function getSignUpFormErrors(fname,email,pass,repeatpass){
    let errors = [];

    if(!fname || fname.trim() === '') {
        errors.push("FirstName is required.");
        let par = fname.parentElement;
        par.classList.add('incorrect');
    }

    if (!email || email.trim() === '') {
        errors.push("Email is required.");
        let par = email.parentElement;
        par.classList.add('incorrect');
    }

    if (!pass || pass.trim() === '') {
        errors.push("Password is required.");
        let par = pass.parentElement;
        par.classList.add('incorrect');
    }

    if (pass !== repeatpass) {
        errors.push("Passwords do not match.");
        pass.parentElement.classList.add('incorrect');
        repeatpass.parentElement.classList.add('incorrect');
    }
    console.log(errors);
    return errors;
}

function getLoginFormErrors(email, pass){
    let errors = [];
  
    if(email === '' || email == null){
      errors.push('Email is required')
      email.parentElement.classList.add('incorrect');
    }
    if(pass === '' || pass == null){
      errors.push('Password is required')
      pass.parentElement.classList.add('incorrect');
    }
    console.log(errors);
    return errors;
  }

let Inputs = [fname,email,pass,repeatpass];

console.log(Inputs);

function isNotNull(input){
     return input!= null;
}

const filledInputs = Inputs.filter(isNotNull);
  
filledInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errmsg.innerText = '';
        }
    });
});