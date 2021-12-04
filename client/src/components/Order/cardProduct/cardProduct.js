import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/cartConstants";
import "./cardProduct.css";
//Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//Services
import { getItem } from "../../../services/localStorage";
import { Config } from "../../../config/config";

export default function CardProduct(props) {
  //Sate Quantity
  const updateQuantity = (e) => {
    setQuantityProduct(Number(e.target.value));
  };
  const token = getItem("token");
  const role = getItem("roles");
  const isAdmin = role?.includes("ROLE_ADMIN") ? true : false;
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  //Cart State
  const { cart } = useSelector((state) => ({ ...state.cart }));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Message info client
  const addingInfo = useRef();
  let display = true;

  //Add to cart
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();

    //Add redux
    const itemAdded = {
      ...props.data,
      quantity: quantityProduct,
    };

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: itemAdded,
    });

    //Message
    addingInfo.current.innerText = "Ajouté au panier";

    if (display) {
      display = false;
      setTimeout(() => {
        addingInfo.current.innerText = "";
        display = true;
      }, 500);
    }
  };

  //Delete product
  async function deleteProduct(e) {
    e.preventDefault();
    try {
      const options = {
        method: "DELETE",
        body: JSON.stringify(props.data),
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      // Waiting for the response from the api//
      const response = await fetch(Config.apiUrl + "admin", options);
      const responseData = await response.json();

      if (responseData?.success) {
        setMessage(responseData?.message);
        setSuccess(true);
        setTimeout(function () {
          window.location.reload(1);
        }, 2000);
      }
    } catch ({ response }) {
      console.log(response);
    }
  }
  //Modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div key={props.data._id} className="cardProductContrainer">
      <div className="imageCardProductContainer">
        <img className="imageCardProduct" src={props.data.image} alt="Orange" />
      </div>

      <div className="cardBody">
        <div className="card-title">
          <h3 className="titleCard">{props.data.title}</h3>
        </div>

        <div className="cardDescription">
          <p>{props.data.description}</p>
        </div>
        <div className="priceCard">
          <p>{props.data.price} €</p>
        </div>
      </div>
      <form className="inputCardContainer">
        <div className="inputQuantity">
          <label className="quantityLabel" htmlFor="quantity">
            Quantités :
          </label>
          <input
            value={props.data.quantity}
            onChange={updateQuantity}
            type="number"
            min="1"
            max="10"
            className="selectProductCard"
          ></input>
        </div>
        <span ref={addingInfo} className="addingInfo"></span>
        <button onClick={addToCart} className="submitProductCard">
          Ajouter au panier
        </button>
        {isAdmin && (
          <>
            <button
              onClick={(e) => {
                setOpen(true);
                setSuccess(false);
                e.preventDefault();
              }}
              className="removeProductCard"
            >
              Supprimer Produit
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  align="center"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Confirmer la suppression ?
                </Typography>
                {!success && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={deleteProduct}
                    fullWidth
                  >
                    OUI
                  </Button>
                )}

                <Typography
                  className="errorMessageProductRemove"
                  align="center"
                >
                  {message}
                </Typography>
              </Box>
            </Modal>
          </>
        )}
      </form>
    </div>
  );
}
