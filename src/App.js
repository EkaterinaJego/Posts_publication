import "./App.css";
import React, { useEffect, useState } from "react";

// import des components :
import EachCard from "./components/EachCard";
import CreatePostModal from "./components/CreatePostModal/index";
import Loader from "./components/Loader/index";

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
  }, [setData, data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="div_base">
      <CreatePostModal />
      {data.length ? (
        data.map((eachData, key) => {
          return <EachCard eachData={eachData} setData={setData} data={data} />;
        })
      ) : (
        <h1>Il n'y a pas de posts pour le moment</h1>
      )}
    </div>
  );
}

export default App;
