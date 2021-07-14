import React from "react";
import "./qualityBlock.css";
import charte from "../../../assets/images/charte.jpeg";

export default function QualityBlock() {
  return (
    <section className="qualityBlock">
      <div className="qualityBlockText">
        <h2 className="qualityTittle">NOTRE ENGAGEMENT QUALITE</h2>
        <p className="qualityText">
          Chez Burger Truck, nous vous garantissons la transparence la plus
          totale sur nos produits, leurs provenances ainsi que nos fournisseurs.
          De la viande issue de producteurs régionaux, une recette de bun
          maison, du fromage AOP et des légumes frais.
        </p>
      </div>
      <div className="ImageQualityBlock">
        <img src={charte} alt="charte" className="imageQuality" />
      </div>
    </section>
  );
}
