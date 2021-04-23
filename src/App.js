import React, { Component } from "react";
import "./static/index.css";
import axios from "axios";
import apiKey from "./config";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

//components
import SearchForm from "./components/SearchForm";
import MainNav from "./components/MainNav";
import PhotoContainer from "./components/PhotoContainer";

export default class App extends Component {

 constructor() {
   super();
   this.state = {
     flickerDataInitial: [],
     flickerDataCats: [],
     flickerDataDogs: [],
     flickerDataComputer: [],
     intialQuery: "airplains",
     loading: "true"
   };
 }

  componentDidMount() {

    this.featchDataFromFlicker("cat");
    this.featchDataFromFlicker("dog");
    this.featchDataFromFlicker("computer");
    this.featchDataFromFlicker(this.state.intialQuery);
    

  }

  featchDataFromFlicker(query) {
    console.log(`this is call inside the query: ${query}`);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        if (query === "cat") {
          this.setState({
            flickerDataCats: response.data.photos.photo,
            loading: false
            })
        } else if (query === "dog") {
          this.setState({
            flickerDataDogs: response.data.photos.photo,
          loading: false
          })
        } else if (query === "computer") {
          this.setState({
            flickerDataComputer: response.data.photos.photo,
            loading: false
          })
        } else {
            this.setState({
              flickerDataInitial: response.data.photos.photo,
              loading: false
            })
        }
      })
      .catch(error => {
        console.log("Erro fetching and paersing data",error);
      });
  }


  // {
  //   (this.state.loading)
  //   ? <h2><strong>Loading...</strong></h2>
  //   : <PhotoContainer photos={ this.state.flickerDataInitial }  />
  // }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={ this.featchDataFromFlicker.bind(this) } />
          <MainNav  />
          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer photos={ this.state.flickerDataInitial }  /> } />
            <Route path="/cats" render={ () => <PhotoContainer photos={ this.state.flickerDataCats }  /> } />
            <Route path="/dogs" render={ () => <PhotoContainer photos={ this.state.flickerDataDogs }  /> } />
            <Route path="/computers" render={ () => <PhotoContainer photos={ this.state.flickerDataComputer }  /> } />
          </Switch>
       </div>
     </BrowserRouter>
    );
  }
};


