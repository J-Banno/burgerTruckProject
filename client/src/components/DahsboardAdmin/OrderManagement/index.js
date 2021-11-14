import React, { useState, useEffect } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
//Services
import { getItem } from "../../../services/localStorage";
import { formatDate } from "../../../services/utils";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);

  const token = getItem("token");

  useEffect(() => {
    getOrders();
  }, []);

  // Get orders //
  async function getOrders() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch("http://localhost:8000/order", options);
      const ordersData = await response.json();
      setOrders(ordersData.order);
    } catch (error) {
      console.log(error);
    }
  }

  function OrderLIst(props) {
    const { row } = props;
    let [updateOrder, setUpdateOrder] = useState({
      statut: props.row.isFinalize,
      orderId: props.row._id,
    });
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
      setUpdateOrder({ ...updateOrder, statut: event.target.checked });
      setIsLoading(true);
    };

    if (isLoading) {
      updateStatut();
      setIsLoading(false);
    }

    // Update statut //
    async function updateStatut() {
      const options = {
        method: "PUT",
        body: JSON.stringify(updateOrder),
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      try {
        const response = await fetch("http://localhost:8000/admin", options);
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    }
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

          <TableCell align="right">{formatDate(row.dateCreation)}</TableCell>
          <TableCell align="right">{row.user?.mail}</TableCell>
          <TableCell align="right">
            <FormControlLabel
              control={<Switch color="success" />}
              label={updateOrder.statut ? "Terminé" : "En préparation"}
              labelPlacement={updateOrder.statut ? "end" : "start"}
              onChange={handleChange}
              checked={updateOrder.statut}
            />
          </TableCell>
          <TableCell align="right">{row._id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Articles commandés
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell align="right">Prix unitaire (€)</TableCell>
                      <TableCell align="right">Total price (€)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items[0]?.cart?.map((historyRow) => (
                      <TableRow key={historyRow.name}>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.qty}
                        </TableCell>
                        <TableCell align="right">{historyRow.price}</TableCell>
                        <TableCell align="right">{historyRow.total}</TableCell>
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
      <h2>Mes Commandes cours</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Référence</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders != null &&
              orders

                .filter((orders) => orders.statut.includes("En préparation"))
                .map((row) => <OrderLIst key={row.idOrder} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Mes Commandes Terminés</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Référence</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders != null &&
              orders

                .filter((orders) => orders.statut.includes("Commande prêtes"))
                .map((row) => <OrderLIst key={row.idOrder} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
