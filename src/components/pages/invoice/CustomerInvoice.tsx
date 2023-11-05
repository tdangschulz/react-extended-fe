import withRoot from "../../hocs/withRoot";
import InvoiceList from "./InvoiceList";

const CustomerInvoice = () => {
  return <InvoiceList invoices={[]}></InvoiceList>;
};

export default withRoot(CustomerInvoice);
