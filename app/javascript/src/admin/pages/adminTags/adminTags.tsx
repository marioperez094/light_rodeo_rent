//External Imports 
import React from "react";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import PageHeader from "@components/headers/pageHeader";
import TagForm from "@adminComponents/tagComponents/tagForm";
import TagTable from "@adminComponents/tagComponents/tagTable";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Utils
import { tagType } from "@utils/types";

//Stylesheets
import "./adminTags.scss";

type AppProps = {};

type AppState = {
  tags: tagType[];
};


class AdminTags extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tags: [],
    }
  };

  componentDidMount(): void {
    this.fetchTags();
  };

  fetchTags = () => {
    fetch("/api/tags")
      .then(handleErrors)
      .then(data => this.setState({ tags: data.tags }))
      .catch(error => alert(error));
  }

  render() {
    return(
      <React.Fragment>
        <AdminNavbar />
        <header>
          <PageHeader>Categorias</PageHeader>
        </header>
        <main className="container-fluid">
          <TagForm fetchTags={ this.fetchTags } />
        </main>
        <section className="container-fluid">
          <TagTable
            tags={ this.state.tags }
          />
        </section>
      </React.Fragment>
    )
  };
};

export default AdminTags;