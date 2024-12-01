//External Imports
import React from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import NoResults from "@components/noResults/noResults";
import ImageCarousel from "@components/imageCarousel/imageCarousel";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

type AppProps = {
  service_id: number;
  language: string;
};

type AppStates = {
  service: tagType;
}

class Service extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      service: {},
    };
  };

  componentDidMount(): void {
    this.fetchAPI();
  };

  fetchAPI = (): void => {
    getRequest(`/api/services/${ this.props.service_id }`, (response: any) => {
      this.setState({ service: response.service });
    });
  };

  render(): React.ReactNode {
    const { service } = this.state;

    if (!service.images) return <NoResults />;

    console.log(service)

    return(
      <>
        <SkipContent link="#" />
        <HomeLayout
          layoutImage={ service.images[0].image_url }
        >
          <main
            id="main"
            role="main"
          >
          </main>
        </HomeLayout>
      </>
    )
  }
};

export default Service;