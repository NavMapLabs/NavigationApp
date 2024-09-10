import React from 'react';
import LogInModal from "@/app/(Auth)/LogInModal";
import { render, waitFor, fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '@/App';
import { useState } from 'react';

jest.useFakeTimers() //If you take this out, it will give a lot reference errors
                    // since for some reason, this tester needs to be on async

describe("LogInModal Component", () => {
  it("Check Log In Modal from App", async () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    )

    //locate button for log in
    const goToLoginButton = screen.getByText("Go to Login")
    //Ensure button is there
    expect(goToLoginButton).toBeTruthy();

    fireEvent.press(goToLoginButton);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("Checking if Login Model render", async () => {
    // Create mock functions for the props
    const onCloseMock = jest.fn();
    const toggleSignUpMock = jest.fn();

    const { getByTestId } = render(<LogInModal isVisible={true} 
                                            onClose={onCloseMock} toggleSignUp={toggleSignUpMock}/>)

    // Wait for any async operations (like animations) to complete
    await waitFor(() => expect(getByTestId('email.text')).toBeTruthy());
    await waitFor(() => expect(getByTestId('email.input')).toBeTruthy());
    await waitFor(() => expect(getByTestId('pwd.text')).toBeTruthy());
    await waitFor(() => expect(getByTestId('pwd.input')).toBeTruthy());
    await waitFor(() => expect(getByTestId('sign-in-button')).toBeTruthy());
    await waitFor(() => expect(getByTestId('forgot-password')).toBeTruthy());
    await waitFor(() => expect(getByTestId('sign-up-button')).toBeTruthy());
  });

  it("Checking input boxes for email and password", async () => {
    // Create mock functions for the props
    const onCloseMock = jest.fn();
    const toggleSignUpMock = jest.fn();

    render(
      <LogInModal isVisible={true} onClose={onCloseMock} toggleSignUp={toggleSignUpMock}/>
    )

    // Check if input field is render and also is empty to begin with
    const email_input = screen.getByTestId('email.input')
    await waitFor(() => expect(email_input).toBeTruthy());
    await waitFor(() => expect(email_input.props.placeholder).toBe('Value'))
    await waitFor(() => expect(email_input.props.value).toBe(''))

    const pwd_input = screen.getByTestId('pwd.input')
    await waitFor(() => expect(pwd_input).toBeTruthy());
    await waitFor(() => expect(pwd_input.props.placeholder).toBe('Value'))
    await waitFor(() => expect(pwd_input.props.value).toBe(''))

    //Insert some value inside
    fireEvent.changeText(email_input, "johndoe@gmail.com")
    await waitFor(() => expect(email_input.props.value).toBe('johndoe@gmail.com'))

    fireEvent.changeText(pwd_input, "password123")
    await waitFor(() => expect(pwd_input.props.value).toBe('password123'))
  });

  it("Check swapping modal between LogIn to SignUp", async () => {
    let isVisible = true

    // Mock functions to simulate state changes
    const toggleSignUpMock = jest.fn(() => {
      isVisible = !isVisible; // Toggle the visibility state
    });
    const onCloseMock = jest.fn(() => {
      isVisible = false; // Set visibility to false
    });

    const {rerender } = render(
      <LogInModal isVisible={isVisible} onClose={onCloseMock} toggleSignUp={toggleSignUpMock}/>
    )

    // Check initial state: LogIn modal should be visible
    const loginModal = screen.getByTestId('log-in-modal'); // Replace with the correct testID for the login modal
    expect(loginModal).toBeTruthy(); // Ensure the login modal is initially visible

    //Get SignUp button and press it
    const sign_up = screen.getByTestId('sign-up-button')
    fireEvent.press(sign_up)

    expect(toggleSignUpMock).toHaveBeenCalled();

    // Simulate a state change to show the Sign Up modal
    rerender(
      <LogInModal isVisible={isVisible} onClose={onCloseMock} toggleSignUp={toggleSignUpMock} />
    );

    //Check if the sign-up modal render
    await waitFor(() => expect(screen.getByTestId("sign-up-modal")).toBeTruthy());
  });
})