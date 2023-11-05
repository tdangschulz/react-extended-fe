import {
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { createProduct, deleteProduct } from "../../../api/product";
import { Product } from "../../../models";

export interface ProductDialogProps {
  open: boolean;
  afterSubmit?: (product: Product) => void;
  afterDelete?: (product: Product) => void;
  onCancel?: () => void;
  product?: Product;
  showDeleteButton?: boolean;
}

export function ProductDialog(props: ProductDialogProps) {
  const {
    onCancel,
    afterSubmit,
    open,
    product,
    afterDelete,
    showDeleteButton = true,
  } = props;

  const [category, setCategory] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [price, setPrice] = React.useState<Number>();
  const [description, setDescription] = React.useState<string>();
  const [vatRate, setVat] = React.useState<number>(19);
  const [id, setId] = React.useState<number>();

  React.useEffect(() => {
    setName(product?.name);
    setCategory(product?.category);
    setPrice(Number(product?.price));
    setDescription(product?.description);
    setId(product?.id);
  }, [props.product]);

  const handleListItemClick = (value: SelectChangeEvent) => {
    setCategory(value.target.value);
  };

  const deleting = async () => {
    if (product) {
      await deleteProduct(product);

      if (typeof afterDelete === "function") {
        afterDelete(product);
      }
    }
  };

  const create = async () => {
    const productToCreate = {
      id,
      name,
      description,
      price,
      vatRate: vatRate / 100,
      category,
    };

    const response = await createProduct(productToCreate);
    if (typeof afterSubmit === "function") {
      afterSubmit(response);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{product?.id ? "" : "Neues"} Produkt</DialogTitle>

      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleListItemClick}
            variant="standard"
            defaultValue={product?.category}
          >
            <MenuItem value={"CAR"}>Auto</MenuItem>
            <MenuItem value={"ACCESSORIES"}>Zubehoer</MenuItem>
            <MenuItem value={"NON"}>Keine Kategorie</MenuItem>
          </Select>
        </FormControl>

        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Id"
          type="number"
          fullWidth
          variant="standard"
          value={id}
          onChange={(event) => setId(Number(event.target.value))}
        />

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Preis"
          type="number"
          fullWidth
          variant="standard"
          value={price}
          onChange={(event) =>
            setPrice(
              event.target.value ? Number(event.target.value) : undefined
            )
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Beschreibung"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="vatRate"
          label="Vat (%)"
          type="text"
          fullWidth
          variant="standard"
          value={vatRate}
          onChange={(event) => setVat(Number(event.target.value))}
        />
      </DialogContent>
      <DialogActions>
        {showDeleteButton ? (
          <Button onClick={deleting} sx={{ mr: 5 }}>
            Löschen
          </Button>
        ) : undefined}
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button onClick={create}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}
