import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//CSS
import "./style.css";
//Core MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Services
import { getItem } from "../../../services/localStorage";
import { Config } from "../../../config/config";

export default function ProductManagement() {
  const history = useHistory();
  //Sate Message add product
  const [message, setMessage] = useState("");
  // State Product
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update Product
  function handleProduct(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  //Upload Image
  function fileSelectHandler(e) {
    setProduct({ ...product, image: e.target.files[0] });
  }

  const token = getItem("token");
  //Request
  async function postProductData(e) {
    e.preventDefault();

    const urlImage = `https://burger-truck-bocal.s3.eu-west-1.amazonaws.com/`;

    const formData = new FormData();
    formData.append("file", product.image);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("urlImage", urlImage);
    formData.append("nameFile", product.image.name);
    try {
      if (isNaN(product.price) === true) {
        setMessage("Veuillez saisir un nombre");
      } else {
        const options = {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // Waiting for the response from the api//
        const response = await fetch(Config.apiUrl + "admin", options);
        const responseData = await response.json();

        if (responseData.success === true) {
          setMessage(responseData.message);
          history.push("/order");
        } else {
          setMessage(responseData.message);
        }
      }
    } catch ({ error }) {
      console.log(error);
    }
  }

  const style = {
    position: "absolute",
    margin: "5px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Button
        className="buttonUploadImageForm"
        variant="contained"
        onClick={handleOpen}
      >
        CREER UN NOUVEAU PRODUIT
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="containerModalAdmin" sx={style}>
          <h2>Ajouter un produit</h2>
          <form
            encType="multipart/form-data"
            className="loginFomContainer"
            onSubmit={postProductData}
          >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                required
                id="title"
                name="title"
                label="Nom du produit"
                value={product.title}
                variant="standard"
                onChange={handleProduct}
                sx={{ p: 1, minWidth: 120 }}
              />
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                value={product.description}
                variant="standard"
                multiline
                maxRows={6}
                onChange={handleProduct}
                sx={{ p: 1, minWidth: 320 }}
              />
              <label className="labelUploadImage" htmlFor="image">
                CHOISIR MON IMAGE
                <input
                  className="buttonUploadImage"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  id="image"
                  name="image"
                  required
                  onChange={fileSelectHandler}
                />
              </label>
              <p className="nameUploadImage">
                {product.image === ""
                  ? "CHOISIR MON IMAGE"
                  : product.image?.name}
              </p>
              <TextField
                required
                id="price"
                name="price"
                value={product.price}
                label="Prix"
                variant="standard"
                onChange={handleProduct}
                sx={{ p: 1, minWidth: 120 }}
              />
              <FormControl variant="standard" fullWidth>
                <InputLabel id="category">Catégorie</InputLabel>
                <Select
                  required
                  labelId="category"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleProduct}
                  sx={{ p: 1, minWidth: 120, mt: 1, mb: 1 }}
                >
                  <MenuItem value="burger">Burger</MenuItem>
                  <MenuItem value="drinks">Boisson</MenuItem>
                  <MenuItem value="desserts">Dessert</MenuItem>
                </Select>
              </FormControl>
              <Button
                className="buttonUploadImage"
                variant="contained"
                type="submit"
                sx={{ p: 1, minWidth: 120 }}
              >
                CRÉER PRODUIT
              </Button>
              <p className="errorModalAdmin">{message}</p>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
}
