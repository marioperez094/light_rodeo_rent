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

//Types
import { tagType, languageType} from "@utils/types";

//Stylesheets
import "./serviceFilter.scss";

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


    if (!tag.services) return <NoResults />;

    const layoutImages = tag.services[0].images[0].image_url;
    const title: languageType = {
      "english": `${ tag.english_name } ${ tag.inflatable && "Inflatables"} Rental`,
      "spanish": `Renta de ${ tag.inflatable && "Inflables"} ${ tag.spanish_name }`,
    } 

    return(
      <>
        <SkipContent link="#services" />
        <HomeLayout
          layoutImage={ layoutImages } 
        >
          <main
            id="main"
            role="main"
          >
            <ImageCarousel
              image={ layoutImages }
            >
              <HeroTitle 
                title={ title[this.props.language] }
              />
            </ImageCarousel>

            <TagList tag={ tag } />
          </main>

        </HomeLayout>
      </>
    )
  };
};

export default ServiceFilter;

