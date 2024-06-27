import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

function SignUpPage() {
return (
    <div className="signUpPage">
    <h1> Signup</h1>
        <FormControl>
            <FormLabel> Username</FormLabel>
            <TextField></TextField>
            <FormLabel type="password"> Password</FormLabel>
            <TextField></TextField>
            <FormLabel type="password"> Confirm Password</FormLabel>
            <TextField></TextField>
            <Button>Submit</Button>
        </FormControl>
    </div>

)
}

export default SignUpPage;
