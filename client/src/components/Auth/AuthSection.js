import React from "react";
import { useHistory } from "react-router-dom";

import { Grid, Box, Typography, Button, Hidden } from "@material-ui/core";
import bgImage from "../../assets/img/bg-img.png";
import chatIcon from "../../assets/img/bubble.svg";

import "./AuthSection.css";

const AuthSection = (props) => {
  const history = useHistory();
  const {
    CtaHeaderText,
    CtaHeaderButtonName,
    routeAfter,
    headerText,
    SubmitBtnName,
  } = props;

  return (
    <Grid container className="container">
      <Hidden only="xs">
        <Grid
          item
          xs={false}
          sm={8}
          md={5}
          style={{
            backgroundImage: `linear-gradient(to bottom,rgb(58, 141, 255,0.85), rgb(134, 185, 255,0.85)), url(${bgImage})`,
          }}
          className="image"
        >
          <Box>
            <img className="chat-icon" src={chatIcon} alt="chat-icon" />
            <Typography variant="h5" className="hero-text">
              Converse with anyone
            </Typography>
            <Typography variant="h5" className="hero-text">
              with any language
            </Typography>
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={4} md={7}>
        <Box>
          <Grid className="top-header">
            <Typography className="gray-text">{CtaHeaderText}</Typography>
            <Button
              id="top-header-btn"
              className="custom-button"
              size="large"
              variant="contained"
              onClick={() => history.push(`${routeAfter}`)}
            >
              {CtaHeaderButtonName}
            </Button>
          </Grid>
          <Grid className="form">
            <Typography variant="h5" className="header-text">
              {headerText}
            </Typography>
            {props.children}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthSection;
