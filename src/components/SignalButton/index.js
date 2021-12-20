import "./index.css";
import Button from "@mui/material/Button";

export default function SignalButton({ handleSignalTag, signalTag }) {
  return (
    <Button
      id="tag_btn"
      style={{
        backgroundColor: signalTag ? "#00304f" : "white",
        color: signalTag ? "white" : "black",
      }}
      onClick={handleSignalTag}
    >
      Signalement
    </Button>
  );
}
