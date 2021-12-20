import "./App.css";
import React, { useEffect, useState } from "react";

// import des components :
import EachCard from "./components/EachCard";
import Modal from "./components/Modal/index";
import Loader from "./components/Loader/index";
import ModifyModal from "./components/ModifyModal/index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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
        console.log("Il n'y a pas du JSON");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, data, Modal, ModifyModal]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="div_base">
      <Modal />
      {data.map((eachData, key) => {
        return <EachCard eachData={eachData} setData={setData} data={data} />;
      })}
    </div>
  );
}

export default App;
