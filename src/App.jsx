import React from "react";
import {
  Doc,
  Hero,
  Login,
  NoAccessAfterLogin,
  ProtectedAuth,
  RootLayout,
  Signup,
  UserDocuments,
} from "./Components/index";
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
      <Route path="/doc/new" element={<Doc />}></Route>
      <Route path="/doc/:id" element={<Doc />}></Route>

      <Route
        path="/user-docs"
        element={
          <ProtectedAuth>
            <UserDocuments />
          </ProtectedAuth>
        }
      ></Route>

      <Route
        path="/signup"
        element={
          <NoAccessAfterLogin>
            <Signup />
          </NoAccessAfterLogin>
        }
      />

      <Route
        path="/login"
        element={
          <NoAccessAfterLogin>
            <Login />
          </NoAccessAfterLogin>
        }
      />
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
