import React, { Component } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import "../styles/App.css";

function toArray(favorites) {
  let array = [];
  for (let item in favorites) {
    array.push({ ...favorites[item], key: item });
  }
  return array;
}

const WrapperFav = styled.section`
  background: #ffae45;
  border-radius: 3px;
`;

class Favorites extends Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("/favorites")
      .on("value", snapshot => {
        const favorites = toArray(snapshot.val());
        this.setState({ favorites });
      });
  }

  removeOneAnnons = removeFavorite => {
    firebase
      .database()
      .ref(`/favorites/${removeFavorite.annonsid}`)
      .remove();
  };

  createlistOfFavorites = favorites => {
    return favorites.map(favorite => (
      <div key={favorite.annonsid} className="col-sm-6">
        <WrapperFav>
          <div className="card">
            <h5 className="card-header">{favorite.arbetsplatsnamn}</h5>
            <div className="card-body">
              <h5 className="card-title">{favorite.annonsrubrik}</h5>
              <p className="card-text">{favorite.kommunnamn}</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => this.removeOneAnnons(favorite)}
              >
                ta bort
              </button>
            </div>
          </div>
        </WrapperFav>
      </div>
    ));
  };

  render() {
    const { favorites } = this.state;
    const listOfFavorites = this.createlistOfFavorites(favorites);
    return (
      <div className="container">
        Favoriter:
        <div className="row">{listOfFavorites}</div>
      </div>
    );
  }
}

export default Favorites;
