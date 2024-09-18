import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import auth from "../../scripts/firebaseConfig";


export const signUp = async (
  email: string,
  password: string,
  rePassword: string
) => {
  try {
    if (password !== rePassword) {
      throw new Error("Passwords do not match");
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await emailVerification();

    //User successfully registered
    const user = userCredential.user;
    console.log("User registered:", user);

    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("User signed in:", user);
    return user;
  } catch (error: unknown) {
    console.log((error as Error).message);
    throw error;
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user).then(() => {
        alert("Verification Email Sent");
      });
    } catch (error: unknown) {
      throw error;
    }
  } else {
    throw new Error("No user is signed in");
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    throw error;
  }
};

export const getData = async () => {
  const user = auth.currentUser;

  if (user) {
    //if not null, thats means users has signed in
    let token = await user.getIdToken();
    console.log(token);
    fetch("http://127.0.0.1:8000/authentication/test", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    alert("Please Log In / Sign Up first");
  }
};
