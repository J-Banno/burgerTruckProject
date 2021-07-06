import React from "react";
import "./presentationBlock.css";

export default function PresentationBlock() {
  return (
    <div>
      <section className="presBlock">
        {/****** Block One ******/}

        <div className="firstPresBlock">
          <h1 className="titltePresentation">Burger Truck</h1>

          <p className="textPresBlock">
            Food-Truck spécialisé dans les hamburgers, Gilles à la cuisine et
            Elsa à la vente s’évertuent à vous proposer une gamme d’hamburgers
            gourmets.
            <br />
            <br />
            Tous nos plats sont élaborés dans notre camion avec des ingrédientsf
            frais et de qualité renouvelé chaque jour. A l’heure du déjeuner
            venez déguster nos burger maisons.
          </p>
        </div>

        {/* Image One */}
        <div className="firstImgPresBlock imgPresBlock"></div>

        {/****** Block Two ******/}
        <div className="secondPresBlock ">
          <p className="textPresBlock">
            Chez Burger Truck nous respectons la chaîne du froid, et sommes
            équipé pour convectionner vos commande dans des mesures d’hyiènes
            les plus strictes.
          </p>
        </div>

        {/* Image Two */}
        <div className="secondImgPresBlock imgPresBlock"></div>

        {/****** Block Third ******/}
        <div className="thirdPresBlock">
          <p className="textPresBlock">
            Un espace détente est mis à votre disposition, pour profiter de vos
            amis et savourer vos plats.
          </p>
        </div>

        {/* Image Three */}

        <div className="thirdImgPresBlock imgPresBlock"></div>
      </section>
      <div className="transitionBackground"></div>
    </div>
  );
}
