import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import AuthSection from "./components/Auth/AuthSection";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    console.log("register!");
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthSection
      CtaHeaderText={"Already have an account?"}
      routeAfter={"/login"}
      CtaHeaderButtonName={"Login"}
      headerText={"Create an account."}
      SubmitBtnName={"Create"}
    >
      <form onSubmit={handleRegister}>
        <Grid>
          <FormControl margin="normal" required className={classes.formControl}>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              fullWidth
              required
              style={{ margin: 8, color: "#B0B0B0" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl margin="normal" required className={classes.formControl}>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              fullWidth
              style={{ margin: 8, color: "#B0B0B0" }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormControl>
        </Grid>
        <FormControl
          margin="normal"
          required
          className={classes.formControl}
          error={!!formErrorMessage.confirmPassword}
        >
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
            fullWidth
            style={{ margin: 8, color: "#B0B0B0" }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <FormHelperText style={{ margin: 8 }}>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
        <Grid>
          <FormControl
            margin="normal"
            required
            className={classes.formControl}
            error={!!formErrorMessage.confirmPassword}
          >
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              fullWidth
              style={{ margin: 8, color: "#B0B0B0" }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <FormHelperText style={{ margin: 8 }}>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              id="cta-btn"
              className="custom-button"
            >
              Create
            </Button>
          </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
