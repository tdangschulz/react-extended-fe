import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../context/globalContext";
import * as React from "react";
import { Invoice, ShoppingItem } from "../../../models";
import { saveInvoice } from "../../../api/product";

const useStyles = {
  root: {
    position: "sticky",
    top: "1rem",
    minWidth: "275",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

export default function OrderSummaryItem() {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();

  const showInvoice = async () => {
    if (state.userInfo) {
      const item = state.shoppingCart.products[0];
      const invoice: Invoice = {
        product: item.product,
        customer: {
          id: state.userInfo.id,
          firstName: state.userInfo.firstName,
          houseNo: state.userInfo.address.houseNo,
          lastName: state.userInfo.lastName,
          residence: state.userInfo.address.residence,
          password: state.userInfo.password,
          zipCode: state.userInfo.address.zipCode,
          street: state.userInfo.address.street,
        },
        totalPrice: state.shoppingCart.total,
        quantity: item.amount,
        isPremiumCustomer: false,
        priceWithoutVat: state.shoppingCart.priceWithoutVat,
      };

      await saveInvoice(invoice);

      navigate("/checkout");
    }
  };

  const deleteItem = (item: ShoppingItem) => {
    dispatch({ type: "DELETE_ITEM", payload: item });
  };

  return (
    <Card sx={useStyles.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom sx={useStyles.title}>
          <strong>{"Cart"}</strong>
        </Typography>
        <hr></hr>
        <Grid container>
          {state.shoppingCart.products.map((item) => (
            <React.Fragment key={item.product.id}>
              <Grid item xs={11} sm={11} md={11} lg={9}>
                <Typography
                  key={item.product.id}
                  variant="body1"
                  component="div"
                  align="left"
                >
                  {item.product.name}
                  {item.amount > 1 ? `(${item.amount})` : ""}
                  <Button onClick={() => deleteItem(item)}>del</Button>
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={3}>
                <Typography variant="h6" component="div" align="right">
                  {(item.product.price * item.amount).toFixed(2)} €
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <hr />
        <Grid container>
          {state.userInfo?.isPremium ? (
            <>
              <Grid item xs={11} sm={11} md={11} lg={9}>
                <Typography variant="body1" component="div" align="left">
                  Premiumrabat 👑
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={3}>
                <Typography variant="h6" component="div" align="right">
                  -{state.shoppingCart.premium.toFixed(2)} €
                </Typography>
              </Grid>
            </>
          ) : undefined}
          <Grid item xs={11} sm={11} md={11} lg={9}>
            <Typography variant="body1" component="div" align="left">
              Netto
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={3}>
            <Typography variant="h6" component="div" align="right">
              {state.shoppingCart.priceWithoutVat.toFixed(2)} €
            </Typography>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={9}>
            <Typography variant="body1" component="div" align="left">
              Total
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={3}>
            <Typography variant="h6" component="div" align="right">
              {state.shoppingCart.total.toFixed(2)} €
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          disabled={state.shoppingCart.products.length === 0}
          size="large"
          color="primary"
          onClick={showInvoice}
        >
          BUY NOW
        </Button>
      </CardActions>
    </Card>
  );
}
