import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import auth from "../../secret/firebaseConfig";

// Function to handle user creation
export const handleSignUp = (email: string, password: string, repassword: string) => {
    if (password !== repassword) {
        console.log("Password doesn't match")
        return
    }
    
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created successfully:", user);
            // You can navigate to a different screen or show a success message here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error creating user:", errorCode, errorMessage);
            // Handle errors here, such as showing an alert to the user
        });
};