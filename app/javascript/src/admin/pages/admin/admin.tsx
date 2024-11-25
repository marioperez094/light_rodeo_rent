//External Imports
import React from "react";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import Calendar from "@adminComponents/calendar/calendar";

class Admin extends React.Component {
  render() {
    return(
      <>
        <AdminNavbar />
        <Calendar />
      </>
    )
  };
};

export default Admin;