import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Background from "../../components/background/background";
import Presentation from "../../components/presentationBlock/presentationBlock";
import Offer from "../../components/offerBlock/offerBlock";
import Quality from "../../components/qualityBlock/qualityBlock";
import Footer from "../../components/footer/footer";

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
