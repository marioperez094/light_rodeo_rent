//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import { AdminCardForm } from "./adminCardsForm";
import PageHeader from "@components/headers/pageHeaders";

//Functions
import { handleErrors } from "@utils/fetchHelper";
import { getRequest, putRequest } from "@utils/fetchRequests";

//Types
import { cardType } from "@utils/types";
type AppProps = {
  cardType: string;
  card_id: string;
};

type AppStates = {
  loading: boolean;
  card: cardType;
};

class AdminCardLoad extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      card: {
        image_url: "",
        tag_id: "0",
        isCarousel: this.props.cardType === "Carrusel",
      },
    };
  };

  componentDidMount(): void {
    this.fetchCard();
  }

  fetchCard = (): void => {
    getRequest(`/api/cards/${ this.props.card_id }`, (response: any) => {
      this.setState({ 
        card: {
          image_url: response.card.image_url,
          tag_id: response.card.tag?.tag_id,
          isCarousel: response.card.isCarousel,
        }})
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      card: {
        ...this.state.card,
        [e.target.name]: e.target.value
      },
    }, () => console.log(this.state.card));
  };

  submitCard = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();
    this.setState({ loading: true });
    
    putRequest(`/api/cards/${ this.props.card_id }`, { card: this.state.card }, (response: any) => {
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

export default AdminCardLoad;