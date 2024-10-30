//External Imports
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import PageHeader from "@components/headers/pageHeader";
import { SubmitForm } from "@components/form/form";
import NoListings from "@components/headers/noListings";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { cardType, serviceType } from "@utils/types";

type AppProps = {
  cardType: string;
};

type AppStates = {
  loading: boolean;
  card: cardType;
};

class AdminCardPage extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      card: {
        image_url: "",
        tag_id: "",
        isCarousel: this.props.cardType === "Carrusel" 
      },
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      card: {
        ...this.state.card,
        [e.target.name]: e.target.value
      }
    }, () => console.log(this.state.card))
  };

  render() {
    return(
      <>
        <header>
          <PageHeader>Crear Cartas</PageHeader>
        </header>
        <main className="container-fluid">
          <AdminCardForm 
            handleChange={ this.handleChange }
          />
        </main>
      </>
    )
  };
};

export default function AdminCardParams() {
  const params = useParams();

  if (params.card_id === "0") return <AdminCardPage cardType={ params.cardType }/>

};


function AdminCardForm({ handleChange }: { handleChange: ChangeEventHandler<HTMLInputElement> }) {
  return(
    <SubmitForm>
      <ServiceImages
        handleChange={ handleChange }
      />
    </SubmitForm>
  )
};

function ServiceImages({ handleChange }: { handleChange: ChangeEventHandler<HTMLInputElement> }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  function fetchServices() {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => retrieveImages(data.services))
      .catch(error => alert(error))    
  };

  function retrieveImages(services: serviceType[]) {
    const imageArray = [];
    services.forEach(service => service.images.forEach(image => imageArray.push(image)));
    setImages(imageArray);
  }

  if (images.length === 0) return <NoListings listing="de servicios" />

  return(
    <article className="col-12">
      <h6>Elige una imagen</h6>
      <div className="row service-images shadow">
        { images.map(image => {
          return(
            <div
              key={ image.image_url }
              className="col-6 shadow rounded mt-3"
            >
              <div className="row h-100">
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <input
                    name="image_url"
                    id={ image.image_url }
                    type="radio"
                    value={ image. image_url }
                    onChange={ (e) => handleChange(e) }
                  />
                </div>
                <label
                  htmlFor={ image.image_url }
                  className="col-10"
                >
                  <div
                    className="service-image rounded"
                    style={{ backgroundImage: `url(${ image.image_url })` }}
                  />
                </label>
              </div>
            </div>
          )
        }) }
      </div>
    </article>
  )
};