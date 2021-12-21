import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useState } from "react";
import Picture from "../../images/picture.jpg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "./index.css";
import axios from "axios";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";

const CreatePostModal = ({ setAlertText, setOpenAlert, setAlertSeverity }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [signalTag, setSignalTag] = useState(false);
  const [interventionTag, setInterventionTag] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setSignalTag(false);
    setInterventionTag(false);
  };

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
    if (signalTag) {
      setSignalTag(!signalTag);
    }
    if (interventionTag) {
      setInterventionTag(!interventionTag);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let dayMonthTime = Date().split(" ");
      let infoAboutDay = `${dayMonthTime[1]} ${dayMonthTime[2]} ${dayMonthTime[3]}`;
      let time = dayMonthTime[4].split(":");
      let infoAboutTime = `${time[0]}h${time[1]}`;

      let id = Date();

      if (name && content && (signalTag || interventionTag)) {
        const response = await axios.post(
          "https://tech-backend-proj.herokuapp.com/posts",
          {
            name: name,
            content: content,
            signalTag: signalTag,
            interventionTag: interventionTag,
            day: infoAboutDay,
            time: infoAboutTime,
            id: id,
          }
        );
        if (response.status === 200 || response.status === 201) {
          setAlertSeverity("success");
          setAlertText("Votre post a bien été créé !");
          setOpenAlert(true);
          handleClose();
          setName("");
          setContent("");
        }
      } else {
        setAlertSeverity("error");
        setAlertText(
          "Merci d'indiquer votre nom, prénom, d'écrire un message et de choisir au moins un tag"
        );
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertText("Une erreur est survenue");
      setOpenAlert(true);
      console.log(error);
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
          fontSize: "30px",
          textTransform: "none",
        }}
        onClick={handleOpen}
      >
        Hey, quoi de neuf à Orgeval?
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
                  inputProps={{
                    maxLength: 40,
                  }}
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
                    inputProps={{
                      maxLength: 200,
                    }}
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
              <Button
                style={{ color: "#2875FF", paddingRight: "20px" }}
                onClick={handleReset}
              >
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
};

export default CreatePostModal;
