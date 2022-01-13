import React from "react";
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

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
      <nav>
        <ul>
          <li>
            <Link to="/">Drivers</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )

}