//External Imports
import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import PageHeader from "@components/headers/pageHeaders";
import NoListings from "@components/headers/noListings";
import { LoadingButton } from "@components/formComponents/formComponents";
import AdminCardLoad from "./adminCardLoad";

//Functions
import { getRequest, postRequest } from "@utils/fetchRequests";
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
        tag_id: "0",
        isCarousel: this.props.cardType === "Carrusel"
      },
    };
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      card: {
        ...this.state.card,
        [e.target.name]: e.target.value
      },
    });
  };

  submitCard = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();
    this.setState({ loading: true });
    
    postRequest("/api/cards", { card: this.state.card }, (response: any) => {
      handleErrors(response)
        .then((data: any) => {
          data.card && window.location.assign("/admin/homepage")
        })
        .catch((error: any) => {
          alert(error);
          this.setState({ loading: false })
        })
    })
  };

  render() {
    return(
      <>
        <PageHeader title="Crear Cartas" />
        <main className="container-fluid">
          <AdminCardForm
            handleChange={ this.handleChange }
            loading={ this.state.loading }
            submitCard={ this.submitCard }
            tag_id={ this.state.card.tag_id }
          />
        </main>
      </>
    )
  };
};



export default function AdminCardParams() {
  const params = useParams();

  if (params.card_id === "0") return <AdminCardPage cardType={ params.cardType }/>

  return (
    <AdminCardLoad
      cardType={ params.cardType }
      card_id={ params.card_id }
    />
  )

};

export function AdminCardForm({ 
  handleChange, 
  submitCard,
  loading,
  tag_id,
}: { 
  handleChange: ChangeEventHandler<HTMLInputElement>;
  submitCard: FormEventHandler<HTMLFormElement>;
  loading: boolean;
  tag_id: string;
}) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);
  
  function fetchTags() {
    getRequest("/api/tags", (response: any) => {
      setTags(response.tags);
    });
  };

  return(
    <form 
      className="row"
      onSubmit={ submitCard }
    >
      <ServiceImages
        handleChange={ handleChange }
      />
      <div className="col-md-6 mt-3">
        <label
          className="form-label"
          htmlFor="tag-select"
        >
          Categoria
        </label>
        <select
          className="form-select col-md-6"
          id="tag-select"
          name="tag_id"
          value={ tag_id }
          onChange={ handleChange }
        >
          <option value={ 0 } disabled></option>
            { tags.map((tag: any) => {
              return(
                <option key={ tag.id } value={ tag.id }>{ tag.spanish_name } </option>
            )
          })}
        </select>
      </div>
      <div className="col-md-2 offset-md-4 mb-auto">
        <LoadingButton
          loading={ loading }
          text="Guarda"
        />
      </div>
    </form>
  )
};

function ServiceImages({ 
  handleChange,
 }: { 
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  function fetchServices() {
    getRequest("/api/services", (response: any) => {
      retrieveImages(response.services)
    });
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
      <div className="row service-images p-2">
        { images.map(image => {
          return(
            <div
              key={ image.image_url }
              className="col-md-6 shadow rounded mt-3"
            >
              <div className="row h-100">
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <input
                    name="image_url"
                    id={ image.image_url }
                    type="radio"
                    value={ image.image_url }
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