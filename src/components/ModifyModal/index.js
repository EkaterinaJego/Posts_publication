import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModeIcon from "@mui/icons-material/Mode";
import Input from "@mui/material/Input";
import { useState } from "react";
import Picture from "../../picture.jpg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";
import "./index.css";
import axios from "axios";

export default function ModifyModal({ eachData }) {
  const [open, setOpen] = useState(false);
  const [newContent, setNewContent] = useState(eachData.content);
  const [newName, setNewName] = useState(eachData.name);
  const [newSignalTag, setNewSignalTag] = useState(eachData.signalTag);
  const [newInterventionTag, setNewInterventionTag] = useState(
    eachData.interventionTag
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContent = (event) => {
    setNewContent(event.target.value);
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleInterventionTag = () => {
    setNewInterventionTag(!eachData.interventionTag);
  };

  const handleSignalTag = () => {
    setNewSignalTag(!eachData.signalTag);
  };

  const handleReset = () => {
    setNewName(eachData.name);
    setNewContent(eachData.content);
    setNewInterventionTag(eachData.interventionTag);
    setNewSignalTag(eachData.signalTag);
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let dayMonthTime = Date().split(" ");
      let infoAboutDay = `${dayMonthTime[1]} ${dayMonthTime[2]} ${dayMonthTime[3]}`;
      let time = dayMonthTime[4].split(":");
      let infoAboutTime = `${time[0]}h${time[1]}`;

      const response = await axios.patch(
        `https://tech-backend-proj.herokuapp.com/posts/${eachData.id}`,
        {
          name: newName,
          content: newContent,
          signalTag: newSignalTag,
          interventionTag: newInterventionTag,
          day: infoAboutDay,
          time: infoAboutTime,
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Votre post a bien été modifié");
        handleClose();
      }
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  return (
    <div id="modify_modal_div">
      <div
        style={{
          flexDirection: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <ModeIcon
          sx={{
            width: "30px",
            height: "30px",
            color: "#2875FF",
          }}
          onClick={handleOpen}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box_style">
          <div className="typography_div">
            <Typography id="modal-modal-title">
              Modifier votre publication
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
                  value={newName}
                  variant="outlined"
                  onChange={handleName}
                  fullWidth
                />

                <Box
                  className="text_area_box"
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Texte..."
                    className="text_area"
                    value={newContent}
                    onChange={handleContent}
                    autoFocus
                    size="medium"
                    fullWidth
                    multiline
                    maxRows="5"
                    minRows="3"
                  />
                </Box>
                <div className="btns_div">
                  <IntButton
                    value={newInterventionTag}
                    handleInterventionTag={handleInterventionTag}
                    interventionTag={newInterventionTag}
                  />
                  <SignalButton
                    value={newSignalTag}
                    handleSignalTag={handleSignalTag}
                    signalTag={newSignalTag}
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
                    backgroundColor: "#2875FF",
                    color: "white",
                    fontWeight: "bold ",
                  }}
                  type="submit"
                >
                  Modifier
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
