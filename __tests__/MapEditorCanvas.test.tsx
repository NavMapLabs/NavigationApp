import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import App from "@/App";
import { NavigationContainer } from "@react-navigation/native";

describe("<APP />", () => {
  it("simple test to renderer", async () => {
    const tree = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    const goToEditorButton = screen.getByText('Go to Editor');

    // Ensure the button is in the document
    expect(goToEditorButton).toBeTruthy();
    fireEvent.press(goToEditorButton)

    // await waitFor(() => {
    //   // Check if the Details screen content is rendered
    //   expect(screen.getByText('Details Page')).toBeTruthy();
    // });
    // const testerButton = screen.getByText('ADD NODE TESTER (STAR)');
    // expect(testerButton).toBeTruthy();

  });
});
