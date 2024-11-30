//External Imports
import React from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import { TagImage } from "@components/imageCarousel/imageCarousel";
import { HeroTitle } from "@components/heroComponents/heroComponents";

//Context
import { LanguageProvider } from "@context/language";

//Types
import { tagType } from "@utils/types";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Stylesheets
import "./serviceFilter.scss";
import { frontPageText } from "../../utils/pageText";

type AppProps = {
  tag_id: number;
  language: string;
};

type AppStates = {
  tag: tagType;
};

class ServiceFilter extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      tag: {},
    };
  };

  componentDidMount(): void {
    this.fetchAPI();
  };

  fetchAPI = (): void => {
    getRequest(`/api/tags/${ this.props.tag_id }`, (response: any) => {
      this.setState({ tag: response.tag });
    });
  };

  render() {
    const { tag } = this.state;

    if (!tag.services) return;

    const layoutImages = tag.services[0].images[0].image_url;
    const title = `${ tag[`${ this.props.language }_name`] } ${ frontPageText.rent[this.props.language] }`

    return(
      <>
        <SkipContent link="#" />
        <HomeLayout
          layoutImage={ layoutImages } 
        >
          <main
            id="main"
            role="main"
          >
            <TagImage
              image={ layoutImages }
            >
              <HeroTitle 
                title={ title }
              />
            </TagImage>
          </main>

        </HomeLayout>
      </>
    )
  };
};

export default ServiceFilter;

