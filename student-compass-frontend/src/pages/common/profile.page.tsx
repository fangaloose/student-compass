import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { UserState } from "../../features/user/userSlice";
import stringToColor from "../../utils/colorgen";
import UserService from "../../service/users.service";
import { toast } from "react-toastify";

interface Password {
  oldPassword: string;
  showOldPassword: boolean;

  newPassword: string;
  showNewPassword: boolean;

  newPassword2: string;
  showNewPassword2: boolean;
}

const ProfilePage = () => {
  const user: UserState = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const [values, setValues] = React.useState<Password>({
    oldPassword: "",
    showOldPassword: false,
    newPassword: "",
    showNewPassword: false,
    newPassword2: "",
    showNewPassword2: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = (name: keyof Password) => {
    setValues({
      ...values,
      [name]: !values[name],
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submitPass = async ()=>{
    if(values.newPassword===values.newPassword2){
      try{
        await UserService.changePassUser(user.id,values.newPassword,values.oldPassword)
      }
      catch(e:any){
        toast.error(e.message,{})
      }
     
    }else{
      toast.error("Passwords don't match",{})
    }
  }

  return (
    <>
    <Paper>
      <Grid xs={12} spacing={4} paddingY='10px'>
        <Grid item xs={12} alignItems="center" justifyContent="center">
          <Avatar
            sx={{
              backgroundColor: stringToColor(user.fname + " " + user.lname),
              margin: "40px auto",
              width: "120px",
              height: "120px",
              fontSize: "55px",
            }}
          >
            {user.fname.split("")[0].toUpperCase() +
              "" +
              user.lname.split("")[0].toUpperCase()}
          </Avatar>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={2} md={5} textAlign="right">
            <PersonIcon
              sx={{ width: "80px", height: "80px" }}
              color="secondary"
            ></PersonIcon>
          </Grid>
          <Grid container xs={10} md={7} textAlign="left">
            <Grid xs={12} marginTop="10px" marginLeft="25px">
              <small color="grey">
                Your Email address: <br />
              </small>
              <Typography variant="overline">
                <b>{user.email}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} marginY="20px">
          <Grid item xs={2} md={5} textAlign="right">
            <FingerprintIcon
              sx={{ width: "80px", height: "80px" }}
              color="secondary"
            ></FingerprintIcon>
          </Grid>
          <Grid container xs={10} md={7} textAlign="left">
            <Grid xs={12} marginTop="10px" marginLeft="25px">
              <small color="grey">
                Your Role: <br />
              </small>
              <Typography variant="overline">
                <b>{user.role}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        
        <Grid container xs={12} marginTop="20px" padding="20px">
          <Grid item xs={12}><h3>Change Password</h3></Grid>
          <Grid item xs={12} marginTop="20px" paddingX="10px">
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                Old Password
              </InputLabel>
              <Input
                name="oldPassword"
                type={values.showOldPassword ? "text" : "password"}
                value={values.oldPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("showOldPassword")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showOldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} marginTop="25px" paddingX="10px">
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                New Password
              </InputLabel>
              <Input
                name="newPassword"
                type={values.showNewPassword ? "text" : "password"}
                value={values.newPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("showNewPassword")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} marginTop="25px" paddingX="10px">
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                Re-enter new Password
              </InputLabel>
              <Input
                name="newPassword2"
                type={values.showNewPassword2 ? "text" : "password"}
                value={values.newPassword2}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleClickShowPassword("showNewPassword2")
                      }
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showNewPassword2 ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} marginTop="25px">
            <Button variant="contained" fullWidth onClick={submitPass}>
              Confirm
            </Button>
          </Grid>
        </Grid>
        
      </Grid>
      </Paper>
      
    </>
  );
};

export default ProfilePage;
