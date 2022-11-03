import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Question from "./question";
import Finished from "./finished";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/question/:questionId" element={<Question />} />
        <Route path="/question/finished" element={<Finished />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
