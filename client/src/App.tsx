import {createBrowserRouter, RouterProvider} from "react-router-dom";



import {ChakraProvider, createSystem, defaultConfig} from "@chakra-ui/react";
import Courses from "./pages/Courses";
import Welcome from "./pages/Welcome";
import SingleCourse from "./pages/SingleCourse";
function App() {



  const config = {};
  const system = createSystem(defaultConfig, config);


  const routes = createBrowserRouter([
    {
      path:"/",
      element:<Welcome/>,
      errorElement:<h1>Error</h1>
    },


     {
      path:"/courses",
      element:<Courses/>,
      errorElement:<h1>Error</h1>
    },


         {
      path:"/courses/:id",
      element:<SingleCourse/>,
      errorElement:<h1>Error</h1>
    },
  ])

  return (

    <ChakraProvider value={system} >
      <RouterProvider router={routes}   />
    </ChakraProvider>
  )
}

export default App
