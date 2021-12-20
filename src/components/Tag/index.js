import React from "react";
import IntButton from "../IntButton";
import SignalButton from "../SignalButton";

const Tag = ({ eachData }) => {
  const signalTag = eachData.signalTag;
  const interventionTag = eachData.interventionTag;

  return (
    <div>
      {eachData.signalTag === true ? (
        <SignalButton signalTag={signalTag} />
      ) : (
        ""
      )}
      {eachData.interventionTag === true ? (
        <IntButton interventionTag={interventionTag} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Tag;
