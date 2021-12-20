import React from "react";
import "./index.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import ModifyModal from "../ModifyModal/index";
import DeleteIcon from "@mui/icons-material/Delete";
import Picture from "../../picture.jpg";
import Tag from "../Tag/index";
import axios from "axios";
import { useState } from "react";

const EachCard = ({ eachData }) => {
  const [clicked, setClicked] = useState(false);

  // Pour effacer un post
  const handleDelete = async () => {
    setClicked(true);
    try {
      const response = await axios.delete(
        `https://tech-backend-proj.herokuapp.com/posts/${eachData.id}`
      );
      if (response) {
        alert("Votre post a bien été supprimé");
      }
    } catch (error) {
      alert("Une erreur est survenue");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
      }}
    >
      <Card id="card_main">
        <div id="maindiv">
          <Avatar alt="profile_picture" src={Picture} id="avatar" />
          <div style={{ width: "100%" }}>
            <div id="modifanddeleteicons">
              <div style={{ flex: 5 }}>
                {eachData.day} à {eachData.time}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ModifyModal eachData={eachData} />
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
                        color: clicked ? "red" : "gray",
                      }}
                      onClick={handleDelete}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="name_div">{eachData.name}</div>
            <div>
              <div className="text">{eachData.content}</div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Tag eachData={eachData} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EachCard;
