import "./App.css";
import React, { useEffect, useState } from "react";

// import des components :
import EachCard from "./EachCard";
import Modal from "./Modal/index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Pour récupérer l'ensemble des posts :

  useEffect(() => {
    fetch("http://localhost:4000/post").then(function (response) {
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
  }, [setData]);

  return isLoading ? (
    <div>Data est en train de charger</div>
  ) : (
    <div>
      <Modal />
      {data.map((eachData, key) => {
        return (
          <div key={eachData.id}>
            <EachCard eachData={eachData} setData={setData} data={data} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
