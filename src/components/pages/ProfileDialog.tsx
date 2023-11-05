import { DialogActions, DialogContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { registerCustomer, saveAdminProfile } from "../../api/userApi";
import { useGlobalState } from "../../context/globalContext";
import { mapUserInfo } from "../hocs/withAuth";
import { Profile } from "../../models";

export interface ProfileDialogProps {
  open: boolean;
  afterSubmit?: (product: Profile) => void;
  onCancel?: () => void;
  profile?: Profile;
  showPassword?: boolean;
  registerDialog?: boolean;
  showDeleteButton?: boolean;
  submitTitle?: string;
}

function generateRandomNumber() {
  const min = 10000; // Mindestwert
  const max = 99999; // Höchstwert
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min); // Generierung der Zufallszahl
  return randomNumber;
}

export function ProfileDialog(props: ProfileDialogProps) {
  const {
    onCancel,
    afterSubmit,
    open,
    profile,
    showPassword = true,
    registerDialog,
    showDeleteButton = true,
    submitTitle = "Speichern",
  } = props;
  const { state, dispatch } = useGlobalState();
  const [firstName, setFirstName] = React.useState<string>();
  const [street, setStreet] = React.useState<string>();

  const [houseNo, setHouseNo] = React.useState<Number>();
  const [lastName, setLastName] = React.useState<string>();
  const [residence, setResidence] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const [zipCode, setZipCode] = React.useState<string>();
  const [id, setId] = React.useState<number>(generateRandomNumber());

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setId(Number(userId));
    }
  }, []);

  React.useEffect(() => {
    setFirstName(profile?.firstName);
    setStreet(profile?.address.street);
    setHouseNo(Number(profile?.address.houseNo));
    setLastName(profile?.lastName);
    setResidence(profile?.address.residence);
    setPassword(profile?.password);
    setZipCode(profile?.address.zipCode);
  }, [profile]);

  const deleting = async () => {};

  const save = async () => {
    let response;
    const user = {
      id,
      firstName,
      houseNo,
      lastName,
      residence,
      password,
      zipCode,
      street,
    };
    if (!registerDialog) {
      response = await saveAdminProfile(user);
    } else {
      response = await registerCustomer(user);
    }

    if (typeof afterSubmit === "function" && dispatch && state.userInfo) {
      const profile = mapUserInfo(response, state.userInfo.isAdmin);
      dispatch({
        type: "ADD_USER",
        payload: profile,
      });

      afterSubmit(profile);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Profil {profile?.isPremium ? "👑" : ""}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="id"
          label="Kundennummer"
          type="number"
          fullWidth
          variant="standard"
          value={id}
          disabled
        />

        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          autoFocus
          margin="normal"
          id="lastName"
          label="Nachname"
          type="text"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="street"
          label="Straße"
          type="text"
          fullWidth
          variant="standard"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="houseNo"
          label="Hausnummer"
          type="number"
          fullWidth
          variant="standard"
          value={houseNo}
          onChange={(event) =>
            setHouseNo(
              event.target.value ? Number(event.target.value) : undefined
            )
          }
        />
        <TextField
          autoFocus
          margin="normal"
          id="zipCode"
          label="PLZ"
          type="text"
          fullWidth
          variant="standard"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="residence"
          label="Wohnort"
          type="text"
          fullWidth
          variant="standard"
          value={residence}
          onChange={(event) => setResidence(event.target.value)}
        />
        {showPassword ? (
          <TextField
            autoFocus
            margin="normal"
            id="password"
            label="Passwort"
            type="text"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        ) : undefined}
      </DialogContent>
      <DialogActions>
        {showDeleteButton ? (
          <Button onClick={deleting} sx={{ mr: 5 }}>
            Delete
          </Button>
        ) : undefined}
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button onClick={save}>{submitTitle}</Button>
      </DialogActions>
    </Dialog>
  );
}
