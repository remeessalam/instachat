import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/SignUp";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import Chatpage from "./pages/Chatpage";
import Error from "./pages/Error";
import Showuser from "./pages/ShowProfile";
import io from "socket.io-client";
import { bigScreen } from "./utils/constant";
import SideBar from "./layout/SideNavBar";

const socket = io.connect("http://localhost:4000/");
// const socket = "hai";
const AppLayout = () => {
  return (
    <div className="flex ">
      <div className={`${bigScreen ? `w-[244px] bg-gray-400 fixed` : `w-0`}`}>
        <SideBar />
      </div>
      <div
        className={`lg:w-width w-full 
        lg:ml-[240px] ml-0`}
      >
        <Outlet />
      </div>
    </div>
  );
};

//we can create route in createBrowserrouter it's coming from react-router-dom
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    error: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: <Chatpage Socket={socket} />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/showuser/:id",
        element: <Showuser />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    error: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    error: <Error />,
  },
]);
export default appRouter;
// export default App;

// http://localhost:4000

//  OLD WAY OR DOING ROUTE

// function App() {
//   const socket = io.connect("http://localhost:4000/");
//   // http://localhost:4000
//   // https://socket.adidasshoe.shop/
//   return (
//     <div>
//       <GoogleOAuthProvider clientId="117584395273-oljruplarl1md005un2cv7rmkvf11so6.apps.googleusercontent.com">
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/login" element={<Login />} />
//             <Route exact path="/signup" element={<Signup />} />
//             <Route exact path="/" element={<HomePage />} />
//             <Route exact path="/profile" element={<ProfilePage />} />
//             <Route exact path="/chat" element={<Chatpage Socket={socket} />} />
//             <Route exact path="/showuser/:id" element={<Showuser />} />
//           </Routes>
//         </BrowserRouter>
//       </GoogleOAuthProvider>
//     </div>
//   );
// }
