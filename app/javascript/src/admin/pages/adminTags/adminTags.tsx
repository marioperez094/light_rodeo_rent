//External Imports 
import React from "react";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import PageHeader from "@components/headers/pageHeaders";
import TagForm from "@adminComponents/tagComponents/tagForm";
import TagTable from "@adminComponents/tagComponents/tagTable";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./adminTags.scss"

type AppProps = {};

type AppStates = {
  tags: [] | tagType[];
};

class AdminTags extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      tags: [],
    };
  };

  componentDidMount(): void {
    this.fetchTags();
  };

  fetchTags = (): void => {
    getRequest("/api/tags", (response: any) => {
      this.setState({ tags: response.tags })
    });
  };
  
  render() {
    const { tags } = this.state;
    const serviceTags = tags.filter((tag: tagType) => !tag.inflatable);
    const inflatableTags = tags.filter((tag: tagType) => tag.inflatable);

    return(
      <>
        <AdminNavbar />
        <PageHeader title="Categorias" />
        <main className="container-fluid">
          <TagForm fetchTags={ this.fetchTags } />
          <section>
            <TagTable
              title="Servicios"
              disabled={ true }
              tags={ serviceTags } 
            />
            <TagTable
              title="Inflables"
              disabled={ true }
              tags={ inflatableTags } 
            />
          </section>
        </main>
      </>
    )
  };
};

export default AdminTags;