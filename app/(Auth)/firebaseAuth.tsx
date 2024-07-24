import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import auth from "../../secret/firebaseConfig";

export const signUp = async (email: string, password: string, rePassword: string) => {
    try {
        if (password !== rePassword) {
            throw new Error('Passwords do not match');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await emailVerification();

        //User successfully registered
        const user = userCredential.user
        console.log("User registered:", user)

        return user
    } catch (error: unknown) {
        throw error;
    }
}

export const handleLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Hi, you're log in then")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export const emailVerification = async () => {

    const user = auth.currentUser
    if(user) {
        try {
            await sendEmailVerification(user)
            .then(()=>{
                alert("Verification Email Sent")
            });
        } catch(error: unknown) {
            console.log("Errror sending verification email")
        }
    } else {
            console.error("No user is signed in")
    }
}