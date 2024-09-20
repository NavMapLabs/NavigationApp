// Homepage.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Homepage from '../app/(Home)/Homepage'; // Adjust the path based on your file structure
import { NavigationContainer } from '@react-navigation/native';

describe('Homepage Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Homepage />
      </NavigationContainer>
    );

    // Verify that the text "Hi Honghui" is rendered
    expect(getByText('This is the Tester Version')).toBeTruthy();
  });

  // it('should toggle login modal visibility when "Go to Login" button is pressed', () => {
  //   const { getByText, queryByText } = render(
  //     <NavigationContainer>
  //       <Homepage />
  //     </NavigationContainer>
  //   );

  //   // Check that the modal is not visible initially
  //   expect(queryByText('Login')).toBeNull();

  //   // Press "Go to Login" button
  //   fireEvent.press(getByText('Go to Login'));

  //   // Check that the login modal is now visible
  //   expect(queryByText('Login')).toBeTruthy();
  // });

  // it('should navigate to MapEditor when "Go to Editor" button is pressed', () => {
  //   const { getByText } = render(
  //     <NavigationContainer>
  //       <Homepage />
  //     </NavigationContainer>
  //   );

  //   fireEvent.press(getByText('Go to Editor'));

  //   // You can use mocks to verify if navigation was called, 
  //   // or use further checks if MapEditor component renders correctly
  // });
});
