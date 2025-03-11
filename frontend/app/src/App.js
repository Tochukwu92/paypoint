//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
//import { lazy } from "react";
//import Landingpage from './landingpage';
const LazyHomePage = React.lazy(() => import("./homepage"));

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <React.Suspense
                fallback={
                  <div className="lazyloading">
                    <ClipLoader color="#61dafb" size={50} />
                  </div>
                }
              >
                <LazyHomePage />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
