//External Imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import PageHeader from "@components/headers/pageHeader";
import NoListings from "@components/headers/noListings";
import { SubmitForm } from "@components/formComponents/form";
import TagList from "@components/tagTable/tagList";

//Functions
import { handleErrors, safeCredentialsFormData } from "@utils/fetchHelper";

//Types
import { cardType } from "@utils/types";
import { tagType } from "../../utils/types";
import { SaveButton } from "../../components/formComponents/form";



export default function AdminCardFormParams({ 
  carouselCards,
  serviceListCards 
  } : { 
  carouselCards: cardType[];
  serviceListCards: cardType[]; 
}) {
  const params = useParams();
  const cards = params.cardType === "Carrusel" ? carouselCards : serviceListCards;

  return(
    <AdminCardForm 
      cardType={ params.cardType }
      card_id={ params.card_id }
      card={ cards[params.card_id] }
    />
  )
};


type AppProps = {
  cardType: string;
  card_id: string;
  card: cardType;
};

type AppStates = {
  tags: tagType[],
  card: cardType,
  loading: boolean,
};

class AdminCardForm extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      tags: [],
      card: {
        image_url: "",
        tag_id: "",
        isCarousel: this.props.cardType === "Carrusel" 
      },
      loading: false,
    };
  };

  componentDidMount(): void {
    console.log(this.props.card)
    this.setCard();
    this.fetchTags();
  };

  setCard = () => {
    if (!this.props.card) {
      return
    }
    this.setState({ card: this.props.card })
  }

  fetchTags = () => {
    fetch("/api/tags")
      .then(handleErrors)
      .then(data => this.setState({ tags: data.tags.filter(tag => !tag.inflatable) }))
      .catch(error => console.log(error))
  };

  handleImageChange = (input) => {
    this.setState({ 
      card: {
        ...this.state.card,
        image_url: input.target.value
      } 
    })
  };
  
  handleTagChange = (input) => {
    this.setState({ 
      card: {
        ...this.state.card,
        tag_id: input.target.value
      } 
    })
  };

  submitCard = (input) => {
    if (input) input.preventDefault();
    let link = !this.props.card ? "/api/cards" : `/api/cards/${ this.props.card.id }`
    let method = !this.props.card ? "POST" : "PUT"
    const { card } = this.state;
    const { image_url, tag_id, isCarousel } = card;

    let formData = new FormData();

    if (!isCarousel) formData.set("card[tag_id]", tag_id);

    formData.set("card[image_url]", image_url);
    formData.set("card[isCarousel]", isCarousel);

    console.log(link, method)

    fetch(link, safeCredentialsFormData({
      method: method,
      body: formData
    }))
      .then(handleErrors)
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };

  render() {
    const { card, tags, loading } = this.state;
    const { isCarousel } = card;
    return(
      <>
        <header>
          <PageHeader>Crear Cartas</PageHeader>
        </header>
        <SubmitForm onSubmit={ this.submitCard }>
          <ServiceImages
            handleChange={ this.handleImageChange } 
          />
          <TagList
            disabled={ isCarousel }
            tags={ tags }
            changeCategory={ this.handleTagChange }
          />
          <div className="col-1 col-md-3 offset-md-9">
            <SaveButton
              loading={ loading }
            />
          </div>
        </SubmitForm>
      </>
    )
  }
};


function ServiceImages({ handleChange } : { handleChange: Function }) {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices();
  },[]);

  function fetchServices() {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => setServices(data.services))
      .catch(error => console.log(error))
  };

  if (services.length === 0) return(<NoListings listing="servicios" />)

  return(
    <>
      <main className="container-fluid">
      <h6>Elige una imagen</h6>
        <article className="row service-images shadow">
          { services.map((service) => {
            if (service.images.length === 0) return
            return(
              <React.Fragment key={ service.id }>
                { service.images.map((image) => {
                  return (
                    <div
                      key={ image.image_url }
                      className="col-6 shadow rounded mt-3"
                    >
                      <div className="row h-100">
                        <div className="col-2 d-flex justify-content-center align-items-center">
                          <input 
                            name="service-image" 
                            id={ image.image_url } 
                            type="radio" 
                            value={ image.image_url }
                            onChange={ (e) => handleChange(e) }
                          />
                        </div>
                        <label 
                          htmlFor={ image.image_url }
                          className="col-10">
                          <div 
                            className="service-image rounded" 
                            style={{backgroundImage: `url(${ image.image_url })`}} 
                          />
                        </label>
                      </div>
                    </div>
                  )
                })}
              </React.Fragment>
            )
          })}
        </article>
      </main>
    </>
  )
}