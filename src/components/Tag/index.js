import React from "react";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";
import "./index.css";

const Tag = ({ data }) => {
  const { signalTag, interventionTag } = data;

  return (
    <div
      style={{
        marginBottom: "40px",
        marginLeft: "-20px",
      }}
    >
      {interventionTag === true ? (
        <IntButton interventionTag={interventionTag} />
      ) : null}
      {signalTag === true ? <SignalButton signalTag={signalTag} /> : null}
    </div>
  );
};

export default Tag;
