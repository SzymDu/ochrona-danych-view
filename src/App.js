import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import ButtonComponent from "./Components/ButtonComponent";
import TextAreaComponent from "./Components/TextAreaComponent";
import FormComponent from "./Components/FormComponent";



function App() {
  return (
    <div className="App">
      <h1>Rozszyfrowanie monoalfabetyczne
      </h1>
        <FormComponent></FormComponent>
    </div>
  );
}

export default App;
