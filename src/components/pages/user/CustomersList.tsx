import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { deleteCustomer, getCustomers } from "../../../api/userApi";
import withRoot from "../../hocs/withRoot";
import { Profile } from "../../../models";

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = React.useState<Profile[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const availableProducts = await getCustomers();
      setCustomers(availableProducts);
    };
    fetch();
  }, []);

  const deleteUser = async (customerId?: number) => {
    if (customerId) {
      await deleteCustomer(customerId);

      const index = customers.findIndex(
        (customer) => customer.id === customerId
      );
      delete customers[index];

      setCustomers(customers.filter(Boolean));
    }
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Nachname</TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((row) => (
                  <TableRow
                    key={row.firstName}
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
                      {row.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.lastName}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Button onClick={() => deleteUser(row.id)}>
                        Löschen
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default withRoot(CustomersList);
