import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Background from "../../components/background/background";
import Presentation from "../../components/presentationBlock/presentationBlock";
import Footer from "../../components/footer/footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Background />
      <Presentation />
      <Footer />
    </div>
  );
}
export default HomePage;
