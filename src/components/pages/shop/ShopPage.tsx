import { Grid, TextField, ThemeProvider } from "@mui/material";
import { FC, useCallback, useContext, useEffect } from "react";
import { getProducts } from "../../../api/product";
import { useGlobalState } from "../../../context/globalContext";
import { Product } from "../../../models";
import theme from "../../commons/theme";
import withRoot from "../../hocs/withRoot";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { ShopTable } from "./components/ShopTable";
import { LocaleContext } from "../../../context/localContext";

const ShopPage: FC = () => {
  const { dispatch, state } = useGlobalState();
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetch = async () => {
      const availableProducts = await getProducts();
      dispatch({ type: "AVAILABLE_PRODUCTS", payload: availableProducts });
    };

    if (state.products.length === 0) {
      fetch();
    }
  }, []);

  const addProduct = useCallback((product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="start">
        <Grid item sm={12}>
          <TextField placeholder={locale.search}></TextField>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ShopTable
            addingProduct={addProduct}
            products={state.products}
          ></ShopTable>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ marginTop: { xs: 2, sm: 3, md: 4, lg: 0 } }}
        >
          <ShoppingCart></ShoppingCart>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRoot(ShopPage);
