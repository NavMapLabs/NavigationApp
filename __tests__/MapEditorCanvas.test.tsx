import React from "react";
import App from "@/App";
import { NavigationContainer } from "@react-navigation/native";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

// Documentation on react-native-testing lib
// - https://testing-library.com/docs/queries/about/
// Documentation on Jest Expect function
// - https://jestjs.io/docs/expect


describe("<APP />", () => {
  // it("example test to renderer\n remove this test after remove the \"Add Node Tester (star)\" test", () => {
  //   // remove this test after remove the "Add Node Tester (star)" test
  //   const tree = render(
  //     <NavigationContainer>
  //       <App />
  //     </NavigationContainer>
  //   );

  //   // locate button
  //   const goToEditorButton = screen.getByText("Go to Editor");
  //   // Ensure the button is in the document
  //   expect(goToEditorButton).toBeTruthy();


  //   fireEvent.press(goToEditorButton);
  //   expect(screen.getByTestId("MapEditor")).toBeTruthy();

  //   const testerButton = screen.getByText("Add Node Tester (star)");
  //   expect(testerButton).toBeTruthy();

  //   // expect(screen.getByTestId("NavigationNode")).toBeUndefined();

  //   // check the "star" update
  //   // query (queryAllByTestId) will not report error on not found
  //   // used here bc expecting not found
  //   let nodes = screen.queryAllByTestId("NavigationNode")
  //   let edges = screen.queryAllByTestId("NavigationEdge")

  //   // 0) start with no nodes
  //   expect(nodes.length).toBe(0);
  //   expect(edges.length).toBe(0);

  //   // 1) add 5 nodes
  //   fireEvent.press(testerButton);
  //   nodes = screen.getAllByTestId("NavigationNode")
  //   expect(nodes.length).toBe(5);

  //   // 2) add 5 outer edge
  //   fireEvent.press(testerButton);
  //   edges = screen.getAllByTestId("NavigationEdge")
  //   expect(edges.length).toBe(5);

  //   // 3) add 5 inner edge
  //   fireEvent.press(testerButton);
  //   edges = screen.getAllByTestId("NavigationEdge")
  //   expect(edges.length).toBe(10);

  //   // 4) remove 3 node with edge attach to them
  //   fireEvent.press(testerButton);
  //   nodes = screen.getAllByTestId("NavigationNode")
  //   edges = screen.getAllByTestId("NavigationEdge")
  //   expect(nodes.length).toBe(3);
  //   expect(edges.length).toBe(3);

    
  //   // 5) remove last 2 node with edge attach to them
  //   fireEvent.press(testerButton);
  //   nodes = screen.queryAllByTestId("NavigationNode")
  //   edges = screen.queryAllByTestId("NavigationEdge")
  //   expect(nodes.length).toBe(0);
  //   expect(edges.length).toBe(0);
  // });

  
  it("More test could be in same \'describe\'", () => {
    expect(1).toBe(1);
  });
});
