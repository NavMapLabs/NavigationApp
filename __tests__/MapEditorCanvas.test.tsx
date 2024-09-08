import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import App from "@/App";
import { NavigationContainer } from "@react-navigation/native";

describe("<APP />", () => {
  it("simple test to renderer", async () => {
    const tree = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    const goToEditorButton = screen.getByText("Go to Editor");

    // Ensure the button is in the document
    expect(goToEditorButton).toBeTruthy();
    fireEvent.press(goToEditorButton);

    await waitFor(() => {
      // Check if the Details screen content is rendered
      expect(screen.getByTestId("MapEditor")).toBeTruthy();
    });

    const testerButton = screen.getByText("Add Node Tester (star)");
    expect(testerButton).toBeTruthy();

    // expect(screen.getByTestId("NavigationNode")).toBeUndefined();

    // check the "star" update
    // query (queryAllByTestId) will not report error on not found
    // used here bc expecting not found
    let nodes = screen.queryAllByTestId("NavigationNode")
    let edges = screen.queryAllByTestId("NavigationEdge")

    // 0) 
    expect(nodes.length).toBe(0);
    expect(edges.length).toBe(0);

    // 1) add 5 nodes
    fireEvent.press(testerButton);
    nodes = screen.getAllByTestId("NavigationNode")
    expect(nodes.length).toBe(5);

    // 2) add 5 outer edge
    fireEvent.press(testerButton);
    edges = screen.getAllByTestId("NavigationEdge")
    expect(edges.length).toBe(5);

    // 3) add 5 inner edge
    fireEvent.press(testerButton);
    edges = screen.getAllByTestId("NavigationEdge")
    expect(edges.length).toBe(10);

    // 4) remove 3 node with edge attach to them
    fireEvent.press(testerButton);
    nodes = screen.getAllByTestId("NavigationNode")
    edges = screen.getAllByTestId("NavigationEdge")
    expect(nodes.length).toBe(3);
    expect(edges.length).toBe(3);

    
    // 5) remove last 2 node with edge attach to them
    fireEvent.press(testerButton);
    nodes = screen.queryAllByTestId("NavigationNode")
    edges = screen.queryAllByTestId("NavigationEdge")
    expect(nodes.length).toBe(0);
    expect(edges.length).toBe(0);
  });
});
