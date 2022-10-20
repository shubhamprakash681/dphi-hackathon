import styled from "@emotion/styled";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import "../../styles/challenges.css";
import { useDispatch, useSelector } from "react-redux";
import { Link as LNK, useLocation, useNavigate } from "react-router-dom";
import {
  deleteChallenge,
  getAllChallenges,
  getCurrentChallengeDetails,
} from "../../actions/challengesActions";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const stateVar = useSelector((state) => state.myReducers);

  const [id, setId] = useState(0);
  const [tittle, setTittle] = useState("Data Sprint Challenge");
  const [description, setDescription] = useState(
    "Identify the class to which each butterfly belongs to"
  );
  const [level, setLevel] = useState("easy");
  const [overview, setOverview] = useState("Lorem ipsum dolor sit");
  const [status, setStatus] = useState("upcoming");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const pages = ["Overview"];

  const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
  }));

  const StyledLink = styled(Link)(({ theme }) => ({
    height: "100%",
    textDecoration: "none",
    color: "black",
    fontWeight: "bolder",
  }));

  useEffect(() => {
    const currentChallengeId = stateVar.challengeReducer.currentChallengeID;
    const allChallenges = stateVar.challengeReducer.challenges;

    const currentChallenge = allChallenges.filter((item) => {
      return item.id === currentChallengeId;
    });
    // console.log("here, ", currentChallenge[0]);

    setId(currentChallenge[0].id);
    setTittle(currentChallenge[0].challengeName);
    setDescription(currentChallenge[0].description);
    setLevel(currentChallenge[0].level);
    setOverview(currentChallenge[0].overview);
    setStatus(currentChallenge[0].status);
    setStartDate(currentChallenge[0].startDate);
    setEndDate(currentChallenge[0].endDate);
  }, [stateVar]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const { target_url } = location.state as LocationState || { target_url: null};

  return (
    <>
      <Stack>
        <Stack
          p={10}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          }}
        >
          <Box>
            <span
              style={{
                padding: "4px 15px",
                borderRadius: "10px",
                backgroundColor: "#f9cd5c",
                display: "inline-flex",
                alignItems: "center",
                color: "black",
              }}
            >
              <ScheduleOutlinedIcon
                fontSize="xs"
                style={{
                  padding: "0 5px 0 0",
                }}
              />
              {status === "upcoming" && (
                <Typography>
                  Starts On {dayjs(startDate).format(" DD MMM'YY h:mm A")}
                </Typography>
              )}
              {status === "past" && (
                <Typography>
                  Ended On {dayjs(endDate).format(" DD MMM'YY h:mm A")}
                </Typography>
              )}
              {status === "active" && "Active"}
            </span>
          </Box>
          <Box
            marginTop={"15px"}
            p="8px"
            fontSize={"xx-large"}
            fontWeight={"bold"}
          >
            {tittle}
          </Box>

          <Box
            style={{
              margin: "25px 0 0 0",
            }}
            p="8px"
          >
            {description}
          </Box>
          <Box
            style={{
              marginTop: "5px",
            }}
          >
            <div
              style={{
                width: "90px",
                padding: "8px 0",
                display: "flex",
                justifyContent: "center",
                backgroundColor: theme.palette.background.main,
                borderRadius: "7px",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              {level}
            </div>
          </Box>
        </Stack>

        <Stack>
          <AppBar
            position="initial"
            style={{
              backgroundColor: theme.palette.background.main,
              color: "grey",
            }}
          >
            <StyledToolBar>
              <Box display={"flex"}>
                {pages.map((page, index) => (
                  <>
                    <Box
                      key={index + 1001}
                      className="menuItemDiv"
                      style={{
                        margin: "0 2vw",
                        borderBottom: "2px solid",
                        borderBottomColor: theme.palette.primary.main,
                        cursor: "pointer",
                        padding: "20px",
                        borderRadius: "2px",
                      }}
                    >
                      <StyledLink key={index} to={"/"}>
                        {page}
                      </StyledLink>
                    </Box>
                  </>
                ))}
              </Box>

              <Box display={"flex"} justifyContent={"space-evenly"}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    marginRight: "40px",
                  }}
                >
                  <LNK
                    to={"/"}
                    className="link"
                    style={{
                      color: "white",
                    }}
                  >
                    Home
                  </LNK>
                </Button>
                <Button
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch(getCurrentChallengeDetails(id));

                    navigate("/update");
                  }}
                  variant="contained"
                  size="small"
                  style={{
                    marginRight: "40px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch(deleteChallenge(id));
                    // .then(() => {
                    //   try {
                    //     navigate("/");
                    //   } catch (err) {
                    //     console.log(err);
                    //   }
                    // });

                    toast("Deleted Successfully");

                    console.log("navigating");
                    navigate("/");
                  }}
                  variant="outlined"
                  style={{
                    color: "#e4534f",
                    borderColor: "#e4534f",
                  }}
                  size="small"
                >
                  Delete
                </Button>
              </Box>
            </StyledToolBar>
          </AppBar>
        </Stack>

        <Box width={"60%"} p={10}>
          {overview}
        </Box>
      </Stack>
    </>
  );
};

export default DetailsPage;
