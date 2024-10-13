//External Imports
import React from "react";

//Components
import AdminNavbar from "@components/navbar/adminNavbar";
import Calendar from "@components/calendar/calendar";

//Stylesheets
import "./admin.scss";

type AppProps = {};

type AppStates = {};

class Admin extends React.Component<AppProps, AppStates> {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <Calendar />
      </React.Fragment>
    )
  }
};

export default Admin;