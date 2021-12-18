import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Picture from "../picture.jpg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "./index.css";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#2875FF", color: "white" }}
        onClick={handleOpen}
      >
        "Hey, quoi de neuf à Orgeval ?"
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box_style">
          <div style={{ padding: "20px" }}>
            <Typography
              id="modal-modal-title"
              variant="h8"
              component="h1"
              paddingBottom="10px"
            >
              Créer une publication
            </Typography>
            <div
              style={{
                display: "flex",
                marginBottom: "40px",
                marginTop: "20px",
                border: "solid 1px red",
              }}
            >
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                <Avatar
                  alt="profile_picture"
                  src={Picture}
                  className="profile_picture"
                />
              </div>
              <div style={{ flex: 4 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h12"
                  component="h3"
                  paddingBottom="10px"
                >
                  Nom Prénom
                </Typography>
                <Box
                  className="text_area_box"
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Texte..."
                    variant="standard"
                    className="text_area"
                  />
                </Box>
                <div className="btns_div">
                  <Button>Intervention</Button>
                  <Button>Signalement</Button>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="annul_share_btns" style={{ marginLeft: "50%" }}>
                <Button>Annuler</Button>
                <Button>Partager ce message</Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
