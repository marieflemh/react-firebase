import React, { Component } from "react";
import styled from "styled-components";
import "../styles/App.css";

//firebase
import firebase from "../firebase";

//styling
const Wrapper = styled.section`
  border-radius: 3px;
`;

class Ads extends Component {
  state = {
    annonser: [],
    yrkesomraden: [],
    lan: [],
    antalHits: 0,
    lanID: 1,
    yrkesID: 3,
    nyckelord: "",
    rader: 10
  };

  //calls the fetch function, runs when app starts
  componentDidMount() {
    this.getAnnonser();
    this.getYrkesomraden();
    this.getLan();
  }

  //the fetched data are set in state
  getAnnonser = () => {
    fetch(
      `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${
        this.state.lanID
      }&yrkesomradeid=${this.state.yrkesID}&antalrader=${
        this.state.rader
      }&nyckelord=${this.state.nyckelord}`
    )
      .then(response => response.json())
      .then(annonser => {
        this.setState({
          antalHits: annonser.matchningslista.antal_platsannonser
        });
        this.setState({ annonser: annonser.matchningslista.matchningdata });
      });
  };

  getOneAnnons = getFavorite => {
    //create or push data to database
    firebase
      .database()
      .ref(`/favorites/${getFavorite.annonsid}`)
      .set(getFavorite);
  };

  getYrkesomraden = () => {
    fetch(
      "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden"
    )
      .then(response => response.json())
      .then(yrkesomraden => {
        this.setState({ yrkesomraden: yrkesomraden.soklista.sokdata });
      });
  };

  getLan = () => {
    fetch("http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan")
      .then(response => response.json())
      .then(lan => {
        this.setState({ lan: lan.soklista.sokdata });
      });
  };

  //event handlers/functions
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.getAnnonser();
    });
  };

  createDropdownYrke = yrkesomraden => {
    return yrkesomraden.map(yrkesomrade => (
      <option key={yrkesomrade.id} value={yrkesomrade.id}>
        {yrkesomrade.namn}
      </option>
    ));
  };

  createDropdownLan = lan => {
    return lan.map(landata => (
      <option key={landata.id} value={landata.id}>
        {landata.namn}
      </option>
    ));
  };

  createListOfAnnonser = annonser => {
    return annonser.map(annons => (
      <div key={annons.annonsid} className="col-sm-6">
        <Wrapper>
          <div className="card">
            <h5 className="card-header">{annons.arbetsplatsnamn}</h5>
            <div className="card-body">
              <h5 className="card-title">{annons.annonsrubrik}</h5>
              <p className="card-text"> {annons.kommunnamn}</p>
              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => this.getOneAnnons(annons)}
              >
                Add to favorite
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
    ));
  };

  //the code to be executed
  render() {
    const { annonser, yrkesomraden, lan } = this.state;
    const listOfAnnonser = this.createListOfAnnonser(annonser);

    return (
      <div>
        <div className="container">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputsok">Frisök</label>
              <input
                className="form-control"
                type="text"
                name="nyckelord"
                onChange={this.handleChange}
                value={this.state.nyckelord}
                placeholder="Sök nyckelord"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="lanID">Välj Län</label>
              <select
                className="form-control"
                name="lanID"
                value={this.state.lanID}
                onChange={this.handleChange}
              >
                {this.createDropdownLan(lan)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="yrkesID">Välj yrkesgrupp</label>
              <select
                className="form-control"
                name="yrkesID"
                value={this.state.yrkesID}
                onChange={this.handleChange}
              >
                {this.createDropdownYrke(yrkesomraden)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="antal">Vis antal</label>
              <select
                className="form-control"
                name="rader"
                value={this.state.rader}
                onChange={this.handleChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <button type="button" className="btn btn-light mx-auto">
            Antal annonser:
            <span className="badge badge-light">{this.state.antalHits}</span>
          </button>
        </div>
        <div className="container">
          <div className="row">{listOfAnnonser}</div>
        </div>
      </div>
    );
  }
}

export default Ads;
