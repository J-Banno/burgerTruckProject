import React, { useState, useEffect } from "react";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
//Services
import { formatDate, totalPrice } from "../../services/utils";
import { getItem } from "../../services/localStorage";

export default function UserOrders() {
  //Store
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = getItem("userId");
    const token = getItem("token");
    if (token != null) {
      const options = {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      async function fetchData() {
        try {
          const response = await fetch(
            "http://localhost:8000/ordersUser",
            options
          );
          const ordersData = await response.json();
          setOrders(ordersData.myOrders);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, []);

  function OrderLIst(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow
          color="secondary"
          sx={{
            "& > *": {
              borderBottom: "unset",
              borderColor: "secondary",
            },
          }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left">{row.idOrder}</TableCell>
          <TableCell align="left">{formatDate(row.dateCreation)}</TableCell>
          <TableCell align="left">
            {row.isFinalize === false ? "En préparation" : "Commande prête"}
          </TableCell>
          <TableCell align="left">{totalPrice(row.items) + "€"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Nom</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Quantité</strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>Prix unitaire (€)</strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>Total price (€)</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((historyRow) => (
                      <TableRow key={historyRow.name}>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.qty}
                        </TableCell>
                        <TableCell align="left">
                          {historyRow.price + "€"}
                        </TableCell>
                        <TableCell align="left">
                          {historyRow.total + "€"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <>
      <h2>Mes Commandes</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <strong>Numéro de comande</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Date</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Statut</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Total</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders != null &&
              orders.map((row) => <OrderLIst key={row.idOrder} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
