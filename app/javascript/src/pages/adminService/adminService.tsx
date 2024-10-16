//External Imports
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Components
import AdminNavbar from "@components/navbar/adminNavbar";
import ServiceForm from "@components/formComponents/serviceForm";
import Tag from "@components/tag/tag";


//Functions
import { handleErrors, safeCredentialsFormData, safeCredentials } from "@utils/fetchHelper";

//Types
import { serviceType, tagType } from "@utils/types";

//Stylesheet
import "./adminService.scss"

type AppProps = { service_id: number };

type AppStates = {
  service: serviceType;
  loading: boolean;
};

class AdminService extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      service: {
        english_name: "",
        spanish_name: "",
        english_description: "",
        spanish_description: "",
        dimensions: "",
        images: []
      },
      loading: false
    }
  };

  componentDidMount(): void {
    fetch(`/api/services/${ this.props.service_id }`)
      .then(handleErrors)
      .then(data => {
        this.setState({ service: data.service })
      })
      .catch(error => {
        console.log(error)
      })
  };

  handleChange = (input: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      service: {
        ...this.state.service,
        [input.target.name]: input.target.value
      }
    });
  };

  submitService = (submit) => {
    if (submit) submit.preventDefault();
    this.setState({ loading: true });
    const fileInputElement = document.querySelector('#images');
    const { id, english_name, spanish_name, english_description, spanish_description, dimensions } = this.state.service

    let formData = new FormData();
    
    if (fileInputElement.files.length > 0 ) {
      for (let index = 0; index < fileInputElement.files.length; index++) {
        formData.append('service[images][]', fileInputElement.files[index]);
      };
    }

    formData.set('service[english_name]', english_name);
    formData.set('service[spanish_name]', spanish_name);
    formData.set('service[english_description]', english_description);
    formData.set('service[spanish_description]', spanish_description);
    formData.set('service[dimensions]', dimensions);

    fetch(`/api/services/${ id }`, safeCredentialsFormData({
      method: "PUT",
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.service) return window.location.reload();
      })
      .catch(error => {
        this.setState({
          error: errorObject(error),
          loading: false
        })
      })
  };

  render() {
    const { service, loading } = this.state;
    const { id, images, tags } = service;

    return(
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
          <div className="row">
            <div className="col-6 text-center mt-3">
              <Link
                to={ `/admin/service/${ id }` }
              >
                Editar el Servicio
              </Link>
            </div>
            <div className="col-6 text-center mt-3">
              <Link
                to={ `/admin/service/${ id }/taggables` }
              >
                Editar las Categorias
              </Link>
            </div>
          </div>
          <Routes>
            <Route exact path={ `/admin/service/${ id }` } element={
              <>
                <ImageSlider images={ images } />
                <ServiceForm
                  loading={ loading }
                  service={ service }
                  handleChange={ this.handleChange }
                  submitService={ this.submitService }
                />
              </>
            } />
            <Route path={ `/admin/service/${ id }/taggables` } element={
                <TagSelector
                  id={ id }
                  checkedTags={ tags }
                />
              } 
            />
          </Routes>
        </main>
      </Router>
    )

  }
}

export default AdminService;

function ImageSlider({ images }: { images: [] }) {
  if (images.length === 0) return <p className="text-center text-danger">Este servicio no tiene fotos</p>

  return (
    <div className="row flex-nowrap my-3 scrollableRow">
      { images.map((image, index) => {
        return (
          <div className="col-12 col-md-6 col-xl-4" key={ index }>
            <div className="service-image rounded" style={{ backgroundImage: `url(${ image.image_url })`}} />
          </div>
        )
      })}
    </div>
  )
};

function TagSelector({
  id, 
  checkedTags
}: {
  id: number;
  checkedTags: tagType[]
}) {
  const [serviceTags, setServiceTags] = useState([]);
  const [inflatableTags, setInflatableTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  function fetchTags() {
    fetch(`/api/services/${ id }/tags`)
      .then(handleErrors)
      .then(data => {
        setServiceTags(data.tags.filter((tag) => { return(!tag.inflatable)}))
        setInflatableTags(data.tags.filter((tag) => { return(tag.inflatable)}))
      })
  };

  function changeCateogry(e) {
    if (!e.target.checked) {
      return removeCategory(e);
    }
    
    fetch("/api/taggables", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        service_id: id,
        tag_id: e.target.value
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.taggable) return fetchTags()
      })
      .catch(error => console.log(error))
  };

  function removeCategory(e) {
    fetch(`/api/taggables/${ e.target.value }/${ id }`, safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) return fetchTags()
      })
      .catch(error => console.log(error))
  };

  return (
    <>
      <h3>Servicios</h3>
        <TagList
          tags={ serviceTags }
          changeCategory={ changeCateogry }
        />
      <h3 className="mt-3">Inflables</h3>
        <TagList
          tags={ inflatableTags }
          changeCategory={ changeCateogry }
        />
    </>
  )
};

function TagList({
  tags,
  changeCategory,
}: { 
  tags: tagType[];
  changeCategory: Function;
}) {
if (tags.length === 0) return <p>No ahi categorias</p>

return (
  <div className="row gy-3">
    { tags.map((tag) => {
      return (
        <React.Fragment
          key={ tag.id }
        >
          <Tag
            tag={ tag }
            disabled={ false }
            changeCategory={ changeCategory }
            checked={ tag.service[0] }
          />
        </React.Fragment>
      )
    })}
  </div>
)
};