//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components 
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import ServiceList from "@components/serviceList/serviceList";
import NewServiceForm from "@components/serviceForm/newServiceForm";

class AdminServiceList extends React.Component {
  render() {
    return (
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
          <Routes>
            <Route
              exact path="/admin/service-list"
              element={ <ServiceList /> }
            />
            <Route
              path="/admin/service-list/new-service"
              element={ <NewServiceForm /> }
            />
          </Routes>
        </main>
      </Router>
    )
  };
};

export default AdminServiceList
