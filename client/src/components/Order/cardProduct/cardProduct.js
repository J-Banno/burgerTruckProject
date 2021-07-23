import React from "react";
import "./cardProduct.css";
import image from "../../../assets/images/burger3.jpg";

export default function CardProduct(props) {
  return (
    <div className="cardProductContrainer">
      <div>
        <img className="imageCardProduct" src={image} alt="Orange" />
      </div>

      <div className="cardBody">
        <div className="card-title">
          <h3 className="titleCard">{props.data.title}</h3>
        </div>

        <div className="cardDescription">
          <p>{props.data.description}</p>
        </div>
        <div className="priceCard">
          <p>{props.data.price}</p>
        </div>
      </div>
      <form action="" className="inputCardContainer">
        <select className="selectProductCard">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>

        <input className="submitProductCard" type="submit" value="Valider" />
      </form>
    </div>
  );
}
