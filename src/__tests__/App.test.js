import ReactDOM from 'react-dom/client';
import { render, screen } from "@testing-library/react";
import App from "../App";
import UserConvo from '../components/UserConvo';
import renderer from 'react-test-renderer';
import TextBox from '../components/TextBox';
import EndPage from '../components/EndPage';
import Buttons from '../components/Buttons';


test("renders App.js", () => {
    render(<App />);
});

test("renders App.js", () => {
  render(<UserConvo />);
});

// Last test should be maybe if there is an input into the user conversation, it should render that
// in the UserConvo component 
// Integration or full test through(forget name)? 


it('renders snapshot of the User conversation', () => {
  const component = renderer.create(
    <UserConvo />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });

  test("renders TextBox.jsx", () => {
    render(<TextBox />);
  });

  test("renders EndPage.jsx", () => {
    const endMessage = "Thanks for chatting!";
    render(<EndPage endMessage={endMessage}/>);
  });

  test("renders EndPage.jsx", () => {
    const endMessage = "Thanks for chatting!";
    const component = renderer.create(<EndPage endMessage={endMessage}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Buttons.jsx", () => {
    const choices = ["Button 1", "Button 2"]
    render(<Buttons choices={choices}/>);
  });


  it('renders snapshot of the Button options', () => {
    const choices = ["Button 1", "Button 2"]
    const component = renderer.create(
      <Buttons choices={choices}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });

  

