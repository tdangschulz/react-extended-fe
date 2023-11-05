import { useGlobalState } from "../../../context/globalContext";
import withRoot from "../../hocs/withRoot";
import "./invoice.css";

const InvoiceComp = () => {
  const { state } = useGlobalState();

  return (
    <div className="invoice-box">
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="top">
            <td colSpan={3}>
              <table>
                <tr>
                  <td className="title">
                    <img
                      src="https://davidjusto.com/images/f73.svg"
                      style={{ width: 300, maxWidth: 300 }}
                    />
                  </td>

                  <td>
                    Invoice #: 123
                    <br />
                    Created: {new Date().toLocaleString("de-DE", {})}
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan={3}>
              <table>
                <tr>
                  <td>
                    {state.userInfo?.firstName}
                    <br />
                    {state.userInfo?.address.street}
                    <br />
                    {state.userInfo?.address.zipCode}{" "}
                    {state.userInfo?.address.city}
                  </td>
                  <td>
                    BREDEX GmbH
                    <br />
                    Lindentwete 1
                    <br />
                    38100 Braunschweig
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td>Product</td>
            <td>Amount</td>
            <td className="priceCol">Price</td>
          </tr>

          {state.shoppingCart.products.map((p) => (
            <tr key={p.product.id} className="item">
              <td>{p.product.name} </td>
              <td>{p.amount} </td>
              <td>{p.product.price * p.amount} €</td>
            </tr>
          ))}
          {state.userInfo?.isPremium ? (
            <tr>
              <td></td>
              <td></td>
              <td>Rabat: {state.shoppingCart.premium.toFixed(2)} €</td>
            </tr>
          ) : undefined}
          <tr>
            <td></td>
            <td></td>
            <td>Netto: {state.shoppingCart.priceWithoutVat.toFixed(2)} €</td>
          </tr>
          <tr className="total">
            <td></td>
            <td></td>
            <td>Total: {state.shoppingCart.total.toFixed(2)} €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Invoice = withRoot(InvoiceComp);
