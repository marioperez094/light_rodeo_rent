//External Imports
import React from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import NoResults from "@components/noResults/noResults";
import ImageCarousel from "@components/imageCarousel/imageCarousel";
import { HeroTitle } from "@components/heroComponents/heroComponents";
import ServiceWidget from "@components/service/service";

//Functions
import { getRequest } from "@utils/fetchRequests";
import { retrieveImages } from "@utils/utils";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./service.scss";

type AppProps = {
  service_id: number;
  language: string;
};

type AppStates = {
  service: serviceType;
  images: undefined | [];
}

class Service extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      service: {},
      images: undefined,
    };
  };

  componentDidMount(): void {
    this.fetchAPI();
  };

  fetchAPI = (): void => {
    getRequest(`/api/services/${ this.props.service_id }`, (response: any) => {
      this.setState({ service: response.service });
      this.getImages(response.service);
      this.setTitle(response.service);
    });
  };

  getImages = (service: serviceType): void => {
    retrieveImages([service], (response: any) => {
      if (response.length === 0) return;
      this.setState({ images: response })
    });
  };

  setTitle = (service: serviceType) => {
    document.title = `${ service[`${ this.props.language }_name`] } | Light Rodeo's Rent`
  };

  render(): React.ReactNode {
    const { service, images } = this.state;

    if (!service.english_name) return <NoResults />
    
    const layoutImage = images ? images[images.length - 1].image_url : undefined;

    return(
      <>
        <SkipContent link="#services" />
        <HomeLayout
          layoutImage={ layoutImage }
        >
          <main
            id="main"
            role="Main"
          >
            <ImageCarousel
              image={ layoutImage }
            >
              <HeroTitle
                title={ service[`${ this.props.language }_name`]}
              />
            </ImageCarousel>

            <ServiceWidget
              service={ service }
              images={ images } 
            />
          </main>
        </HomeLayout>
      </>
    )
  }
};

export default Service;