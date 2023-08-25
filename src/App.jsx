import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { homeLoader } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
