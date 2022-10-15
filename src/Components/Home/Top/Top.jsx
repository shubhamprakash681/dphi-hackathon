import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import "../../../styles/home.css";
import RecketImage from "../../../assets/icons/rocketImage.svg";
import TopCard from "./TopCard";

import icn1 from "../../../assets/icons/Group_1000002515.svg";
import icn2 from "../../../assets/icons/Group_1000002516.svg";
import icn3 from "../../../assets/icons/Group_1000002518.svg";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import { getCurrentChallengeDetails } from "../../../actions/challengesActions";
import { useDispatch } from "react-redux";

const Top = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Stack>
        <Grid
          p={{ xs: "0", md: "10vmin 4vmin 4vmin 8vmin" }}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            fontSize: "larger",
          }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={8}>
            <Stack direction="row">
              <div id="dec-stack-main">
                <div id="dec-top"></div>
                <div id="dec-bottom"></div>
              </div>

              <span
                style={{
                  padding: "0 5vmin 5vmin 5vmin",
                }}
              >
                <h1>
                  Accelerate Innovation <br /> with Global AI Challenges
                </h1>

                <h5
                  style={{
                    margin: "10vh 0 4vh 0",
                  }}
                >
                  AI Challenges at DPhi simulate real-world problems. It is a
                  great place to put your AI/Data Science skills to test on
                  diverse datasets allowing you to faster learning through
                  competitions.
                </h5>
                <Button
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch(getCurrentChallengeDetails(0));

                    navigate("/create");
                  }}
                  style={{
                    backgroundColor: theme.palette.background.main,
                    borderRadius: "7px",
                  }}
                >
                  Create Challenges
                </Button>
              </span>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="rocket-container">
              <img id="rocket-img" src={RecketImage} alt="img" />
            </div>
          </Grid>
        </Grid>

        <Grid
          style={{
            backgroundColor: theme.palette.secondary.light,
            color: "white",
          }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={4}>
            <TopCard icon={icn1} count={100} text="AI Model Submission" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopCard icon={icn2} count={50} text="Data Scientist" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopCard icon={icn3} count={100} text="AI Challenges hosted" />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default Top;
