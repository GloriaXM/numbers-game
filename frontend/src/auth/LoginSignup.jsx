import { TextField, Button, IconButton, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.js";
import "./LoginSignup.css";

function LoginSignup({ loginForm }) {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup API request
      const response = await fetch(
        `http://localhost:5000/users/${loginForm ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        console.log("Signup successful");
        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the home page after successful login
        navigate("/Players");
      } else {
        // Handle signup failure case
        alert("Signup failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Signup failed: " + error);
    }
  };

  return (
    <form className="loginSignup" onSubmit={handleSubmit}>
      <Typography> {loginForm ? "Login" : "Signup"}</Typography>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Invalid username or password!
        </Alert>
      </Collapse>

      <TextField
        required
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        {loginForm ? "Login" : "Signup"}
      </Button>
      <div>
        <Typography>
          {loginForm ? "New to the app?" : "Already have an account?"}
        </Typography>
        <Link to={!loginForm ? "/login" : "/signup"}>
          {" "}
          {!loginForm ? "Log In" : "Sign Up"}{" "}
        </Link>
      </div>
    </form>
  );
}

export default LoginSignup;
