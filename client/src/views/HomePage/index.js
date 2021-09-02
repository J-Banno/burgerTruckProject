import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Background from "../../components/Misc/Background/background";
import Presentation from "../../components/Home/presentationBlock/presentationBlock";
import Offer from "../../components/Home/offerBlock/offerBlock";
import Quality from "../../components/Home/qualityBlock/qualityBlock";
import Footer from "../../components/Layout/Footer/footer";

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
