import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals';

//from May 8:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);


//also May 10: 
// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )


//May 10: from stackoverflow: 
// const rootElement =
//   document.getElementById('root');
// const root =
//   createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );


// //fewer errors, original from 2019: 
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
