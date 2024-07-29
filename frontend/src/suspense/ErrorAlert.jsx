import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function ErrorAlert({ displayError, setDisplayError }) {
  return (
    <Collapse in={displayError}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setDisplayError(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        Server has failed!
      </Alert>
    </Collapse>
  );
}

export default ErrorAlert;
