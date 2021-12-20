import React from "react";
import "./index.css";
import Card from "@mui/material/Card";

import Avatar from "@mui/material/Avatar";
import ModifyModal from "../ModifyModal/index";
import DeleteIcon from "@mui/icons-material/Delete";
import Picture from "../../picture.jpg";
import Tag from "../Tag/index";
import axios from "axios";

const EachCard = ({ eachData }) => {
  // Pour effacer un post
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/post/${eachData.id}`
      );
      if (response) {
        alert("Votre post a bien été supprimé");
      }
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection:"" }}>
      <Card variant="outlined" id="card_main">
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
                  alignItems: "stretch",
                  justifyContent: "flex-end",
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
                        color: "gray",
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
            <div>
              <Tag eachData={eachData} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EachCard;
