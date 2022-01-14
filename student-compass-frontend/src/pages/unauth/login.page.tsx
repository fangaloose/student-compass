import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../app/hooks";
import { changeAuth, UserState } from "../../features/user/userSlice";
import { useHistory } from "react-router";
import { useState } from "react";
import AuthService from "../../service/auth.service";
import Spinner from "../../components/spinner/spinner.component";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [userNameValidation, setUserNameValidation] = useState(false);
  const [passValidation, setPassValidation] = useState(false);

  const [email,setEmail]=useState<String>("");
  const [password,setPassword]=useState<String>("");

  const [loaded,setLoaded]=useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoaded(false)
    try{
      const user:UserState=await AuthService.login(email,password)
      history.push("/");
      dispatch(changeAuth(user));
    }
    catch(e:any){
      toast.error(e.message,{})
      setUserNameValidation(true);
      setPassValidation(true);
      setLoaded(true)
    }
 
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/assets/beach-gaeb126b4f_1280.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "grey",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              error={userNameValidation}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{ event && setEmail(event.target.value)}}
            />
            <TextField
              error={passValidation}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>{ event && setPassword(event.target.value)}}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
      {!loaded && <Spinner></Spinner>}
    </Grid>
  );
};

export default LoginPage;
