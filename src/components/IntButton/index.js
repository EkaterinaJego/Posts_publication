import "./index.css";
import Button from "@mui/material/Button";

export default function IntButton({ handleInterventionTag, interventionTag }) {
  return (
    <Button
      id="tag_btn"
      style={{
        backgroundColor: interventionTag ? "#00304f" : "white",
        color: interventionTag ? "white" : "black",
        textTransform: "none",
        fontSize: "19px",
      }}
      onClick={handleInterventionTag}
    >
      Intervention
    </Button>
  );
}
