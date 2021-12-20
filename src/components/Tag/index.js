import React from "react";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";
import "./index.css";

const Tag = ({ eachData }) => {
  const signalTag = eachData.signalTag;
  const interventionTag = eachData.interventionTag;

  return (
    <div
      style={{
        marginBottom: "40px",
      }}
    >
      {eachData.interventionTag === true ? (
        <IntButton interventionTag={interventionTag} />
      ) : (
        ""
      )}
      {eachData.signalTag === true ? (
        <SignalButton signalTag={signalTag} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Tag;
