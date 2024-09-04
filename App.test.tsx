import React  from "react";
import renderer from 'react-test-renderer';


import App from '@/App';


describe('<APP />', () => {
  it('simple test to tester', () => {
    expect(1).toBe(1);
  })

  
  it('simple test to renderer', () => {
    const tree = renderer.create(<App />); //.toJSON()
    expect(1).toBe(1);
  })
})