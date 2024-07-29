import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function FeedbackAlert({ setDisplayFeedback, feedback }) {
  return (
    <Collapse in={feedback != null}>
      <Alert
        severity="warning"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setDisplayFeedback(null);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {feedback}
      </Alert>
    </Collapse>
  );
}

export default FeedbackAlert;
