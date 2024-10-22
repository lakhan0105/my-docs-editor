import React from "react";
import { Hero, NewDoc, RootLayout } from "./Components/index";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Hero />} />
      <Route path="/new-doc" element={<NewDoc />}></Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}>
      <>
        <Hero />
      </>
    </RouterProvider>
  );
}

export default App;
