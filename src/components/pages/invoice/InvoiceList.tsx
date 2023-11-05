import { Grid, ThemeProvider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { getInvoices } from "../../../api/product";
import { Invoice } from "../../../models";
import theme from "../../commons/theme";
import withRoot from "../../hocs/withRoot";

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const avaiableInvoices = await getInvoices();
      setInvoices(avaiableInvoices);
    };
    fetch();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rechnungsnummer</TableCell>
                  <TableCell>Vorname</TableCell>
                  <TableCell>Nachname</TableCell>
                  <TableCell>Anzahl</TableCell>
                  <TableCell>Produkt</TableCell>
                  <TableCell align="right">Nettopreis</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((row) => (
                  <TableRow
                    key={row.product.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.customer.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.customer.lastName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.quantity}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">
                      {row.priceWithoutVat.toFixed(2)} €
                    </TableCell>

                    <TableCell align="right">
                      {row.totalPrice.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRoot(InvoiceList);
