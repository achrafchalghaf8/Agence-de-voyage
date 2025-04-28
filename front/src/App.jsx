import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect,useState } from "react";
import VoyageList from "./components/VoyageList";
import AddVoyage from "./components/AddVoyage";
import UpdateVoyage from "./components/UpdateVoyage";
import ReservationList from "./components/ReservationList";
import AddReservation from "./components/AddReservation";
import EditReservation from "./components/EditReservation";
import UserListComponent from "./components/UserListComponent";
import AddUserComponent from "./components/AddUserComponent";
import EditUserComponent from "./components/EditUserComponent";
import DestinationList from "./components/DestinationList";
import AddDestination from "./components/AddDestination";
import EditDestination from "./components/EditDestination";
import Login from "./components/authentification/login";
import Logout from "./components/authentification/Logout";
import Register from "./components/authentification/Register";
import ProtectedRoutes from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteUs from "./ProtectedRouteUs";
import ProtectedRouteAd from "./ProtectedRouteAd";
import Dashboard from "./components/admin/dashboard";
import DestinationListUser from "./components/user/DestinationListUser";


function App() {

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
      const role = localStorage.getItem("user"); // Assuming 'userRole' is stored in localStorage
      setUserRole(role);
  }, []);

  return (
    <Router>
      <div>
      


        
        {/* Routes pour les voyages */}
        <Routes>


        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/logout" element={<Logout/>}/>

        <Route element ={<ProtectedRoute/>}>

        <Route element ={<ProtectedRouteAd/>}>


          <Route path="/voyages" element={<VoyageList />} />
          <Route path="/add-voyage" element={<AddVoyage />} />
          <Route path="/update-voyage/:id" element={<UpdateVoyage />} />
          
          {/* Routes pour les réservations */}
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/add-reservation" element={<AddReservation />} />
          <Route path="/edit-reservation/:id" element={<EditReservation />} />

          {/* Routes pour les utilisateurs */}
          <Route path="/users" element={<UserListComponent />} />
s
          <Route path="/add-user" element={<AddUserComponent />} />
          <Route path="/edit-user/:id" element={<EditUserComponent />} />

          <Route path="/destinations" element={<DestinationList />} />
        <Route path="/add-destination" element={<AddDestination />} />
        <Route path="/edit-destination/:id" element={<EditDestination />} />
        </Route>

        </Route>

        <Route element ={<ProtectedRouteUs/>}>
        <Route path="/lesdestinations" element={<DestinationListUser />} />
        </Route>




        <Route
          path="/"
          element={<Navigate to="/login"/>} >
        </Route>


        </Routes>
      
      </div>
    </Router>

  
  );
}

export default App;
