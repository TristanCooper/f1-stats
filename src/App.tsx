import React from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Drivers from './pages/Drivers';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Drivers />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )

}