import React from "react";
import "./home.css";
import Navbar from "../Layout/Header/navbar";
import Background from "../Misc/Background/background";
import Presentation from "./presentationBlock/presentationBlock";
import Offer from "./offerBlock/offerBlock";
import Quality from "./qualityBlock/qualityBlock";
import Footer from "../Layout/Footer/footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Background />
      <Presentation />
      <Offer />
      <Quality />
      <Footer />
    </div>
  );
}
export default HomePage;
