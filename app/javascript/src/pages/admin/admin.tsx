//External Imports
import React from "react";

//Components
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import Calendar from "@components/calendar/calendar";

//Stylesheets
import "./admin.scss";

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar 
          current_page="admin"
        />
        <Calendar />
      </React.Fragment>
    )
  };
};

export default Admin;