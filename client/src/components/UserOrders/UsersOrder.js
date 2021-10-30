import React, { useState, useEffect } from "react";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

//Services
import { formatDate, totalPrice } from "../../services/utils";

//Redux
import { useSelector } from "react-redux";

export default function UserOrders() {
  //Store
  const { user } = useSelector((state) => ({ ...state.user }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    if (user != null) {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      };

      const response = await fetch("http://localhost:8000/ordersUser", options);
      const ordersData = await response.json();
      setOrders(ordersData.myOrders);
    }
  }

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
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

          <TableCell align="left">{row.idOrder}</TableCell>
          <TableCell align="right">{formatDate(row.dateCreation)}</TableCell>
          <TableCell align="right">
            {row.isFinalize === false ? "En préparation" : "Commande prête"}
          </TableCell>
          <TableCell align="right">{totalPrice(row.items) + "€"}</TableCell>
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
                      <TableCell align="right">
                        <strong>Prix unitaire (€)</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Total price (€)</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((historyRow) => (
                      <TableRow key={historyRow._id}>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.qty}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.price + "€"}
                        </TableCell>
                        <TableCell align="right">
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
              <TableCell align="right">
                <strong>Date</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Statut</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Total </strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row) => (
              <OrderLIst key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
