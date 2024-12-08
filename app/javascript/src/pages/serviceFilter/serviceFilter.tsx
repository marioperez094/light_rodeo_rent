//External Imports
import React from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import ImageCarousel from "@components/imageCarousel/imageCarousel";
import { HeroTitle } from "@components/heroComponents/heroComponents";
import TagList from "@components/tagList/tagList";
import NoResults from "@components/noResults/noResults";

//Functions
import { getRequest } from "@utils/fetchRequests";
import { retrieveImages } from "@utils/utils";

//Types
import { tagType, languageType } from "@utils/types";

//Stylesheets
import "./serviceFilter.scss";
import LazyLoadWrapper from "../../components/lazyLoaderWrapper/lazyLoadWrapper";

type AppProps = {
  tag_id: number;
  language: undefined | string;
};

type AppStates = {
  tag: tagType;
  layoutImage: string;
};

class ServiceFilter extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      tag: {},
      layoutImage: undefined,
    };
  };

  componentDidMount(): void {
    this.fetchAPI();
  };

  fetchAPI = (): void => {
    getRequest(`/api/tags/${ this.props.tag_id }`, (response: any) => {
      this.setState({ tag: response.tag });
      this.getImages(response.tag);
      this.setTitle(response.tag);
    });
  };

  getImages = (tag: tagType): void => {
    if (!tag.services) return;
    retrieveImages(tag.services, (response: any) => {

      //Last image of services
      const lastImage = response.length - 1;

      if (response.length === 0) return;
      this.setState({ layoutImage: response[lastImage].image_url })
    });
  };

  setTitle = (tag: tagType) => {
    document.title = `${ tag[`${ this.props.language }_name`] } | Light Rodeo's Rent`
  };

  render() {
    const { tag, layoutImage } = this.state;


    if (!tag.services) return <NoResults />;

  
    const title: languageType = {
      "english": `${ tag.english_name } ${ tag.inflatable ? "Inflatables" : ""} Rental`,
      "spanish": `Renta de ${ tag.inflatable ? "Inflables" : ""} ${ tag.spanish_name }`,
    } 

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
                title={ title[this.props.language] }
              />
            </ImageCarousel>

            <LazyLoadWrapper id="tag-list">
              <TagList tag={ tag } />
            </LazyLoadWrapper>
          </main>

        </HomeLayout>
      </>
    )
  };
};

export default ServiceFilter;

