import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Product } from "../../../../models";

type Props = {
  products: Product[];
  addingProduct: (product: Product) => void;
};

export const ShopTable: React.FC<Props> = ({ products, addingProduct }) => {
  const [selected, setSelected] = useState<Product>();

  useEffect(() => {
    console.log("rendering shop table");
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">{"Product"}</TableCell>
            <TableCell align="left">{"Description"}</TableCell>
            <TableCell sx={{ width: 100 }} align="right">
              {"Price"}
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              selected={row.id === selected?.id}
              onClick={() => setSelected(row)}
              key={row.name}
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
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.price} €</TableCell>
              <TableCell padding="checkbox">
                <Button onClick={() => addingProduct(row)}>Add</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
