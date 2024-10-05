//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@components/navbar/adminNavbar";
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
              <Route exact path='/admin/services' element={ <ProductList /> } />
              <Route path="/admin/services/new_service" element={ <NewService /> } />
            </Routes>
        </main>
      </Router>
    )
  }
};

export default AdminServices;