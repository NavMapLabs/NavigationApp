import React  from "react";
import { render } from "@testing-library/react-native";

import App from '@/App';

describe('<APP />', () => {
  it('simple test to tester', () => {
    expect(1).toBe(1);
  })


  it('simple test to renderer', () => {
    const tree = render(<App />); //.toJSON()
    expect(1).toBe(1);
  })
})