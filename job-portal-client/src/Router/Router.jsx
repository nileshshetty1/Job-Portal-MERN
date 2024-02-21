import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import Myjobs from "../Pages/Myjobs";
import SalaryPage from "../Pages/SalaryPage";
import Updatejobs from "../Pages/Updatejobs";
import Login from "../components/Login";
import JobDetails from "../Pages/Jobdetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <CreateJob /> },
      { path: "/my-job", element: <Myjobs /> },
      { path: "/salary", element: <SalaryPage /> },
      {
        path: "edit-job/:id",
        element: <Updatejobs />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-jobs/${params.id}`),
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
