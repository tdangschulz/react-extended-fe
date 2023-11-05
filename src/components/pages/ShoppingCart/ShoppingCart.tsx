import { Container, Grid } from "@mui/material";
import * as React from "react";
import OrderSummaryItem from "./OrderSummaryItem";

export default function ShoppingCart() {
  return (
    <React.Fragment>
      <Container
        fixed
        sx={{ m: 0, p: 0, paddingRight: 0 }}
        style={{ paddingRight: 0 }}
      >
        <Grid container>
          <Grid item lg={12} sm={12}>
            <OrderSummaryItem />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
