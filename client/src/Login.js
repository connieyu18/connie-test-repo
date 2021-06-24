import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import AuthSection from "./components/Auth/AuthSection";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const Login = (props) => {
  const classes = useStyles();
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
    <AuthSection
      CtaHeaderText={"Don't have an account?"}
      routeAfter={"/register"}
      CtaHeaderButtonName={"Create account"}
      headerText={"Welcome back!"}
      SubmitBtnName={"Login"}
    >
      <form onSubmit={handleLogin}>
        <Grid>
          <FormControl margin="normal" required className={classes.formControl}>
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
          <FormControl margin="normal" className={classes.formControl} required>
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
            id="cta-btn"
            className="custom-button"
          >
            Login
          </Button>
        </Grid>
      </form>
    </AuthSection>
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
