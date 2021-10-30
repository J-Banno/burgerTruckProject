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

import { formatDate } from "../../../services/utils";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [statut, setStatut] = useState(false);
  useEffect(() => {
    getOrders();
  }, []);
  async function getOrders() {
    const options = {
      method: "GET",
    };

    const response = await fetch("http://localhost:8000/order", options);
    const ordersData = await response.json();
    setOrders(ordersData.order);
  }

  function buttonArrow() {
    return (
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    );
  }

  return (
    <>
      <h2>Mes Commandes</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{buttonArrow()}</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Référence</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row) => (
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
                  <TableCell />
                  <TableCell>{formatDate(row.dateCreation)}</TableCell>
                  <TableCell align="right">{row.user.mail}</TableCell>
                  <TableCell align="right">
                    {row.isFinalize === false ? (
                      <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="En préparation"
                        labelPlacement="start"
                      />
                    ) : (
                      <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Terminé"
                        labelPlacement="end"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">{row._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
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
                              <TableCell align="right">
                                Prix unitaire (€)
                              </TableCell>
                              <TableCell align="right">
                                Total price (€)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.items[0].cart.map((historyRow) => (
                              <TableRow key={historyRow._id}>
                                <TableCell>{historyRow.name}</TableCell>
                                <TableCell component="th" scope="row">
                                  {historyRow.qty}
                                </TableCell>
                                <TableCell align="right">
                                  {historyRow.price}
                                </TableCell>
                                <TableCell align="right">
                                  {historyRow.total}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
