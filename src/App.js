import React from "react";
import "./static/index.css";

//components
import SearchForm from "./components/SearchForm";
import MainNav from "./components/MainNav";
import PhotoContainer from "./components/PhotoContainer";
import NoPhoto from "./components/NoPhoto";

function App() {
  return (
    <div className="container">
      <SearchForm  />
      <MainNav  />
      <PhotoContainer  />
      <NoPhoto  />
    </div>
  );
}

export default App;
