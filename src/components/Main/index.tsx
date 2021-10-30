import React from "react";
import { Route, Switch } from "react-router-dom";
import AddTruck from "../../pages/AddTruck";
import Front from "../../pages/Front";
import TruckPage from "../../pages/TruckPage";
import TruckProvider from "../../providers/TruckProvider";

import Navbar from "../Navbar";

const Main = () => {
  return (
    <TruckProvider>
      <Switch>
        <Route exact path="/">
          <Front />
        </Route>
        <Route exact path="/add-truck">
          <AddTruck />
        </Route>
        <Route exact path="/:id">
          <TruckPage />
        </Route>
      </Switch>
    </TruckProvider>
  );
};

export default Main;
