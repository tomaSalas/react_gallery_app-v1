import React, { Component } from "react";
import "./static/index.css";
import axios from "axios";
import apiKey from "./config";
import {
  BrowserRouter
} from "react-router-dom";

//components
import SearchForm from "./components/SearchForm";
import MainNav from "./components/MainNav";
import PhotoContainer from "./components/PhotoContainer";
import NoPhoto from "./components/NoPhoto";

export default class App extends Component {

 constructor() {
   super();
   this.state = {
     flickerData: [],
     query: "planets"
   };
 }

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.query}&per_page=24&format=json&nojsoncallback=1`)
    .then( response => {
      this.setState({
        flickerData: response.data.photos.photo
      })
    })
    .catch(error => {
      console.log("Erro fetching and paersing data",error);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm  />
          <MainNav  />
          <PhotoContainer photos={ this.state.flickerData }  />
          <NoPhoto  />
        </div>
      </BrowserRouter>
    );
  }
};


