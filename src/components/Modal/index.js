import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useState } from "react";
import Picture from "../../picture.jpg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";
import "./index.css";
import axios from "axios";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [signalTag, setSignalTag] = useState(false);
  const [interventionTag, setInterventionTag] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleInterventionTag = () => {
    setInterventionTag(!interventionTag);
  };

  const handleSignalTag = () => {
    setSignalTag(!signalTag);
  };

  const handleReset = () => {
    setName("");
    setContent("");
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let dayMonthTime = Date().split(" ");
      let infoAboutDay = `${dayMonthTime[1]} ${dayMonthTime[2]} ${dayMonthTime[3]}`;
      let time = dayMonthTime[4].split(":");
      let infoAboutTime = `${time[0]}h${time[1]}`;

      const response = await axios.post("http://localhost:4000/post", {
        name: name,
        content: content,
        signalTag: signalTag,
        interventionTag: interventionTag,
        day: infoAboutDay,
        time: infoAboutTime,
      });
      if (response.status === 200 || response.status === 201) {
        alert("Votre post a été publié");
        handleClose();
        setName("");
        setContent("");
        // setInterventionTag(false);
        // setSignalTag(false);
      }
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  return (
    <div className="modal_main_div">
      <Button
        className="btn_open_modal"
        variant="contained"
        style={{
          backgroundColor: "#2875FF",
          color: "white",
          width: "600px",
          height: "100px",
          fontSize: "20px",
        }}
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
          <div className="typography_div">
            <Typography id="modal-modal-title">
              Créer une publication
            </Typography>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "10%",
                  marginLeft: "20px",
                  marginRight: "10px",
                  marginTop: "20px",
                }}
              >
                <Avatar
                  alt="profile_picture"
                  src={Picture}
                  className="profile_picture"
                />
              </div>
              <div style={{ flex: 4 }}>
                <Input
                  id="outlined-basic"
                  label="Nom et Prénom"
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontSize: "19px",
                  }}
                  value={name}
                  variant="outlined"
                  onChange={handleName}
                  fullWidth
                  placeholder="Nom et Prénom"
                />

                <Box
                  className="text_area_box"
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    className="text_area"
                    value={content}
                    onChange={handleContent}
                    autoFocus
                    size="medium"
                    fullWidth
                    multiline
                    maxRows="5"
                    minRows="3"
                    placeholder="Votre post..."
                  />
                </Box>
                <div className="btns_div">
                  <IntButton
                    value={interventionTag}
                    handleInterventionTag={handleInterventionTag}
                    interventionTag={interventionTag}
                  />
                  <SignalButton
                    value={signalTag}
                    handleSignalTag={handleSignalTag}
                    signalTag={signalTag}
                  />
                </div>
              </div>
            </div>
            <div id="annul_share_btns">
              <Button style={{ color: "#2875FF" }} onClick={handleReset}>
                Annuler
              </Button>
              <form onSubmit={handleSubmit}>
                <Button
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    fontWeight: "bold ",
                  }}
                  type="submit"
                >
                  Partager ce message
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
