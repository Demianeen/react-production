import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.scss'

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
