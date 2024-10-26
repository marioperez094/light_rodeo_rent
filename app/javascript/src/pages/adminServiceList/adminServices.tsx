//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import ProductList from "./productList"
import NewService from "./newService";

type AppProps = {};

type AppStates = {};

class AdminServices extends React.Component<AppProps, AppStates> {
  render() {
    return(
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
            <Routes>
              <Route exact path='/admin/servicelist' element={ <ProductList /> } />
              <Route path="/admin/servicelist/new_service" element={ <NewService /> } />
            </Routes>
        </main>
      </Router>
    )
  }
};

export default AdminServices;