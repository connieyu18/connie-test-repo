import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  Hidden,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import bgImage from "./assets/img/bg-img.png";
import chatIcon from "./assets/img/bubble.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  image: {
    backgroundImage: `linear-gradient(to bottom,rgb(58, 141, 255,0.85), rgb(134, 185, 255,0.85)), url(${bgImage})`,
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  headerText: {
    marginBottom: "15px",
    fontWeight: 600,
  },
  heroText: {
    color: "#D8D8D8",
    fontWeight: 400,
  },
  chatIcon: {
    marginBottom: 30,
  },
  topHeader: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    margin: "5%",
  },
  form: {
    width: "60%",
    maxWidth: "400px",
    margin: "0px auto",
    marginTop: "10rem",
  },
  formControl: {
    width: "100%",
  },
  customButton: {
    borderRadius: "3px",
    boxShadow: "0px 2px 12px rgba(74, 106, 149, .2)",
    fontSize: "0.9em",
  },
  topHeaderBtn: {
    backgroundColor: "white",
    color: "#3A8DFF",
    marginLeft: "20px",
    fontWeight: "400",
  },
  CTABtn: { display: "flex", margin: "40px auto", padding: "3% 15%" },
  grayText: {
    color: "#B0B0B0",
    fontSize: "0.9em",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  console.log("login!", props);
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.container}>
      <Hidden only="xs">
        <Grid item xs={false} sm={8} md={5} className={classes.image}>
          <Box>
            <img className={classes.chatIcon} src={chatIcon} alt="chat-icon" />
            <Typography className={classes.heroText}>
              Converse with anyone
            </Typography>
            <Typography className={classes.heroText}>
              with any language
            </Typography>
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={4} md={7}>
        <Box>
          <Grid className={classes.topHeader}>
            <Typography className={classes.grayText}>
              Don't have an account?
            </Typography>
            <Button
              onClick={() => history.push("/register")}
              className={`${classes.customButton} ${classes.topHeaderBtn}`}
              size="large"
              variant="contained"
            >
              Create account
            </Button>
          </Grid>
          <form onSubmit={handleLogin}>
            <Grid className={classes.form}>
              <Typography variant="h5" className={classes.headerText}>
                Welcome back!
              </Typography>
              <Grid>
                <FormControl
                  margin="normal"
                  required
                  className={classes.formControl}
                >
                  <TextField
                    fullWidth
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    style={{ margin: 8, color: "#B0B0B0" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  margin="normal"
                  className={classes.formControl}
                  required
                >
                  <TextField
                    fullWidth
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                    style={{ margin: 8, color: "#B0B0B0" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={`${classes.customButton} ${classes.CTABtn}`}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
