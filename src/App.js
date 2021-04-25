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
import NotFound from "./components/NotFound";

export default class App extends Component {

 constructor() {
   super();
   this.state = {
     flickerDataInitial: [],
     flickerDataSearch: [],
     flickerDataCats: [],
     flickerDataDogs: [],
     flickerDataComputer: [],
     QueryToSearch: "airplains",
     linkCats: "Cats",
     linkDogs: "Dogs",
     linkComputer: "Computers",
     linkAirplains: "Airplains",
     loading: "true",
   };
 }

  componentDidMount() {

    this.featchDataFromFlicker("cat");
    this.featchDataFromFlicker("dog");
    this.featchDataFromFlicker("computer");
    this.featchDataFromFlicker(this.state.QueryToSearch);
    

  }


  featchDataFromFlicker(query) {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        if (query === "cat") {
          this.setState({
            flickerDataCats: response.data.photos.photo,
            loading: false,
            })
        } else if (query === "dog") {
          this.setState({
            flickerDataDogs: response.data.photos.photo,
            loading: false,
          })
        } else if (query === "computer") {
          this.setState({
            flickerDataComputer: response.data.photos.photo,
            loading: false,
          })
        } else if (query === "airplains") {
          this.setState({
            flickerDataInitial: response.data.photos.photo,
            loading: false,
          })
        } else {
            this.setState({
              flickerDataSearch: response.data.photos.photo,
              loading: false,
              QueryToSearch: query
            })
        }
      })
      .catch(error => {
        console.log("Erro fetching and paersing data",error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={ this.featchDataFromFlicker.bind(this) } />
          <MainNav  />
          <Switch>
            <Route exact path="/" render={ 
              () => this.state.loading ? <h2><strong>Loading...</strong></h2> :
               <PhotoContainer 
               photos={ this.state.flickerDataInitial } 
               title={ this.state.linkAirplains} /> } />
            <Route path="/cats" render={
               () => this.state.loading ? <h2><strong>Loading...</strong></h2> : 
               <PhotoContainer 
               photos={ this.state.flickerDataCats }  
               title={ this.state.linkCats }
               /> } />
            <Route exact path="/dogs" render={ 
              () => this.state.loading ? <h2><strong>Loading...</strong></h2> :
               <PhotoContainer 
               photos={ this.state.flickerDataDogs }  
               title={ this.state.linkDogs}
               /> } />
            <Route exact path="/computers" render={ 
              () => this.state.loading ? <h2><strong>Loading...</strong></h2> :
            <PhotoContainer 
              photos={ this.state.flickerDataComputer }  
              title={ this.state.linkComputer}
              /> } />
            <Route exact path="/:search" render={ 
              () => this.state.loading ? <h2><strong>Loading...</strong></h2> :
                <PhotoContainer 
                photos={ this.state.flickerDataSearch }  
                title={ this.state.QueryToSearch}
                /> } />
            <Route component={ NotFound } />
          </Switch>
       </div>
     </BrowserRouter>
    );
  }
};


