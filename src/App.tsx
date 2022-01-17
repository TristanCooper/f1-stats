import React from "react";
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import StyledToolbar from "./components/Toolbar";
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
      <StyledToolbar />
      <Outlet />
    </div>
  )

}