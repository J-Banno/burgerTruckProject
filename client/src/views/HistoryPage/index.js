import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import UserOrders from "../../components/UserOrders/UsersOrder";
export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <UserOrders />
      <Footer />
    </>
  );
}
