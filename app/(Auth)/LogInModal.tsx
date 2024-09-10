import { Text, View, StyleSheet, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { TextInput as PaperTextInput, IconButton } from "react-native-paper";
import { AuthError, User } from "firebase/auth";

import { emailVerification, logIn, logOut } from "./firebaseAuth";

type LogInProps = {
  isVisible: boolean;
  onClose: () => void;
  toggleSignUp: () => void;
};

const LogInModal = (props: LogInProps) => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(true);

  const [emailBorderColor, setEmailBorderColor] = useState("gray");
  const [PasswordBorderColor, setPasswordBorderColor] = useState("gray");

  const handleLogIn = async () => {
    try {
        const user = await logIn(emailText, passwordText)
        await checkIfEmailVerified(user)

    } catch (error: unknown) {
        if (
            (error as AuthError).code === "auth/user-not-found" ||
            (error as AuthError).code === "auth/wrong-password"
        ) {
            alert('Email already in use');
        } else if ((error as AuthError).code === "auth/too-many-request") {
            alert("Too many unsuccessful login attempts. Please try again later.")
        } else {
            alert("Sign In error: " + (error as Error).message)
        }
    }
}

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={props.isVisible}
      onRequestClose={props.onClose}
      testID="log-in-modal"
    >
      <Pressable style={styles.container} onPress={props.onClose}>
        <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <IconButton icon="close" size={24} onPress={props.onClose} />
          </View>
          <Text style={styles.label} testID={"email.text"}>Email</Text>
          <PaperTextInput
            style={[styles.paperInput, { borderColor: emailBorderColor }]}
            onFocus={() => setEmailBorderColor("black")} // border color on focus
            onBlur={() => setEmailBorderColor("gray")} // border color on focus
            placeholder="Value"
            placeholderTextColor="#a9a9a9"
            value={emailText}
            onChangeText={setEmailText}
            theme={{ colors: { primary: "transparent" } }} // this removes the underline
            underlineColor="transparent" // this removes the any extra underline
            testID={"email.input"}
            /* obtain data here */
          />
          <Text style={styles.label} testID={"pwd.text"}>Password</Text>
          <PaperTextInput
            style={[styles.paperInput, { borderColor: PasswordBorderColor }]}
            onFocus={() => setPasswordBorderColor("black")} // border color on focus
            onBlur={() => setPasswordBorderColor("gray")} // border color on focus
            placeholder="Value"
            placeholderTextColor="#a9a9a9"
            secureTextEntry={passwordVisible}
            value={passwordText}
            onChangeText={setPasswordText}
            right={
              <PaperTextInput.Icon
                icon={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.icon} // this adjusts eye icon position
              />
            }
            theme={{ colors: { primary: "transparent" } }} // this removes the underline
            underlineColor="transparent" // this removes any extra underline
            testID={"pwd.input"}
            /* obtain data here */
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              handleLogIn();
            }}
            testID={"sign-in-button"}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <Text style={styles.textSpace}>
            <Text
              style={styles.underline}
              onPress={() => {
                /* handle action here */
              }}
              testID={"forgot-password"}
            >
              Forgot password?
            </Text>
          </Text>
          <Text
            style={styles.underline}
            onPress={() => {
              props.toggleSignUp();
              console.log("Signup Pressed");
              props.onClose();
            }}
            testID={"sign-up-button"}
          >
            Need an account? Sign-up here.
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // making the background page transparent
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: 400,
    alignItems: "center",
  },
  underline: {
    textDecorationLine: "underline",
    color: "black", // set this color of the underline 'black'
  },
  button: {
    backgroundColor: "#71E0BC",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 350,
  },
  buttonText: {
    color: "black", // Set the text color to black
  },
  textSpace: {
    marginTop: 4, // Space before text
    marginBottom: 8, // Space after text
  },
  label: {
    alignSelf: "flex-start", // align labels to the start
    marginLeft: 10, // Add some margin to the left to match the input margin
    marginBottom: 1, // Space between label and input
  },
  icon: {
    marginTop: 20,
  },
  paperInput: {
    borderWidth: 2,
    borderColor: "#777",
    backgroundColor: "white",
    paddingHorizontal: 9,
    paddingVertical: 8,
    margin: 10,
    borderRadius: 6,
    width: 350,
    height: 23,
    // this adjust font size and line height to the standard
    fontSize: 14,
  },
  header: {
    width: "100%",
    height: 15,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 30,
  },
});

const checkIfEmailVerified = async (user: User) => {
  if(user) {
      if(!user.emailVerified) {
        // means that user is still not verified yet, need them to be verified
        await emailVerification()
        await logOut();
        console.log("Not Verified, I'll navigate you later")

      }
      //If verified, navigate to other place
      console.log("Woo Verified, I'll navigate you later")
  } else {
      throw new Error("Failed to check User")
  }
}

export default LogInModal;

/* self-note:
when clocking the navigation 'link',
it erases the most components from the main background. figure out how to prevent that.
setvisible prolly would work for the 'link' (?)
*/

