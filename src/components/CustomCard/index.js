import React from "react";
import "./index.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import ModifyModal from "../ModifyModal/index";
import DeleteIcon from "@mui/icons-material/Delete";
import Picture from "../../images/picture.jpg";
import Tag from "../Tag/index";
import axios from "axios";

const CustomCard = ({ data, setAlertText, setOpenAlert, setAlertSeverity }) => {
  const { id, name, content, day, time } = data;

  // Pour effacer un post
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://tech-backend-proj.herokuapp.com/posts/${id}`
      );
      if (response) {
        setAlertSeverity("success");
        setAlertText("Votre post a bien été supprimé !");
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
    <div
      style={{
        width: "800px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card id="card_main">
        <div id="maindiv">
          <Avatar alt="profile_picture" src={Picture} id="avatar" />
          <div style={{ width: "100%" }}>
            <div id="modifanddeleteicons">
              <div style={{ flex: 5 }}>
                {day} à {time}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ModifyModal
                    data={data}
                    setAlertText={setAlertText}
                    setOpenAlert={setOpenAlert}
                    setAlertSeverity={setAlertSeverity}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: "red",
                      }}
                      onClick={handleDelete}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="name_div">{name}</div>
            <div>
              <div className="text">{content}</div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Tag data={data} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomCard;
