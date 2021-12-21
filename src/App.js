import "./App.css";
import React, { useEffect, useState } from "react";

// import des components :
import CustomCard from "./components/CustomCard";
import CreatePostModal from "./components/CreatePostModal";
import Loader from "./components/Loader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  // Pour récupérer l'ensemble des posts :
  useEffect(() => {
    fetch("https://tech-backend-proj.herokuapp.com/posts").then(function (
      response
    ) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (json) {
          setData(json);
          setIsLoading(false);
        });
      } else {
        console.log("Erreur - Il n'y a pas de JSON");
      }
    });
  }, [setData, data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="div_base">
      <CreatePostModal
        setAlertText={setAlertText}
        setOpenAlert={setOpenAlert}
        setAlertSeverity={setAlertSeverity}
      />
      {data.length ? (
        data.map((eachData, key) => {
          return (
            <CustomCard
              data={eachData}
              key={key}
              setAlertText={setAlertText}
              setOpenAlert={setOpenAlert}
              setAlertSeverity={setAlertSeverity}
            />
          );
        })
      ) : (
        <h1 style={{ marginTop: "50px", fontSize: "22px" }}>
          Il n'y a pas de post pour le moment
        </h1>
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
