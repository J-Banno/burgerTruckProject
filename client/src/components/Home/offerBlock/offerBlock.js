import React from "react";
import { Link } from "react-router-dom";
import "./offerBlock.css";
import burger1 from "../../../assets/images/burger1.jpg";
import burger2 from "../../../assets/images/burger2.jpg";
import burger3 from "../../../assets/images/burger3.jpg";
import burger4 from "../../../assets/images/burger4.jpg";

export default function OfferBlock() {
  return (
    <section className="offerBlock">
      {/* Text Content */}
      <div className="offerBlockTextContent">
        {/*Title*/}
        <h2 className="offerBlockTitle">Notre Carte</h2>
        {/* Text */}
        <p className="offerBlockText">
          Venez découvrir nos hamburgers et accompagnements réalisés chaque jour
          avec beaucoup d’amour et de passion chez Burger Truck.
        </p>

        {/* Link Order Page */}
        <Link className="offerBlockLink" to="/Order">
          PAR ICI
        </Link>
      </div>
      {/* Image One */}
      <div className="offerBlockItem1 offerContainerImage">
        <img className="offerImage" src={burger1} alt="burger" />
      </div>

      {/* Image Two */}
      <div className="offerBlockItem2 offerContainerImage">
        <img className="offerImage" src={burger2} alt="burger" />
      </div>

      {/* Image Three */}
      <div className="offerBlockItem3 offerContainerImage">
        <img className="offerImage" src={burger3} alt="burger" />
      </div>

      {/* Image Four */}
      <div className="offerBlockItem4  offerContainerImage">
        <img className="offerImage" src={burger4} alt="burger" />
      </div>
    </section>
  );
}
