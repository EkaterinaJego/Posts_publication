import React from "react";
import "./index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import Picture from "../picture.jpg";
// import Tag from "../Tag/index";


const EachCard = ({ eachData, setData, data, deletePost }) => {
  return (
    <div>
      <Card variant="outlined" className="card_main">
        <CardContent>
          <div className="maindiv">
            <Avatar
              alt="profile_picture"
              src={Picture}
              className="profile_picture"
            />
            <div>
              <ModeIcon
                sx={{
                  width: 30,
                  height: 30,
                  color: "blue",
                }}
              />
              <DeleteIcon
                sx={{
                  width: 30,
                  height: 30,
                  color: "gray",
                  marginRight: 10,
                  marginLeft: 5,
                }}
                // onClick={fetch(`http://localhost:4000/post/${id}`)
                //   .then((resp) => {
                //     console.log(resp.data);
                //   })
                //   .catch((error) => {
                //     console.log(error);
                //   })}
              />
        
              <div>{eachData.date}</div>
              <div>{eachData.name}</div>
              <div>
                <div className="text">{eachData.content}</div>
              </div>
            </div>
          </div>

          {/* <div>
            <Tag eachData={eachData} />
          </div>  */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EachCard;
