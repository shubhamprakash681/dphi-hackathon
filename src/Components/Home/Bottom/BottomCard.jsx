import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import styled from "@emotion/styled";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentChallengeDetails } from "../../../actions/challengesActions";
import dayjs from "dayjs";
import Counter from "./Counter";

const BottomCard = ({ id, imageURI, tittle = "tittle" }) => {
  const stateVar = useSelector((state) => state.myReducers);
  const dispatch = useDispatch();

  const [challenegeData, setChallengeData] = useState();
  const [t1, setT1] = useState("00");
  const [t2, setT2] = useState("00");
  const [t3, setT3] = useState("00");
  const [status, setStatus] = useState("upcoming");

  const timeDifferenceCalc = (dateFuture, dateNow) => {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    setT1(days);
    setT2(hours);
    setT3(minutes);
  };

  useEffect(() => {
    const allChallenges = stateVar.challengeReducer.challenges;
    const currentChallenge = allChallenges.filter((item) => {
      return item.id === id;
    });

    // console.log("id= ", id, "here", currentChallenge[0]);
    setChallengeData(currentChallenge[0]);
  }, [stateVar]);

  useEffect(() => {
    setInterval(() => {
      const time = dayjs(new Date()).format();

      // console.log(time);

      try {
        var ct = new Date(time);
        var et = new Date(challenegeData.endDate);
        var st = new Date(challenegeData.startDate);

        if (ct < st) {
          // upcoming
          setStatus("upcoming");
          timeDifferenceCalc(st, ct);
        } else if (ct > st && ct < et) {
          // active
          setStatus("active");
          timeDifferenceCalc(et, ct);
        } else {
          // past
          setStatus("past");
          timeDifferenceCalc(ct, et);
        }
      } catch (err) {}
    }, 1000);
  }, [challenegeData]);

  useEffect(() => {
    // console.log("changed status");
    dispatch({
      type: "SET_STATUS",
      payload: { id, status },
    });
  }, [status]);

  const StyledImageBox = styled("div")({
    height: "200px",
    backgroundImage: `url(${imageURI})`,
    display: "flex",
    width: "100%",
  });

  const bgnSelector = (status) => {
    switch (status) {
      case "upcoming":
        return theme.palette.statusbgn.upcoming;

      case "active":
        return theme.palette.statusbgn.active;

      case "past":
        return theme.palette.statusbgn.past;
      default:
        return theme.palette.primary.main;
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Box
        p={0}
        borderRadius="20px"
        border="1px solid"
        borderColor={theme.palette.primary.light}
        backgroundColor={theme.palette.background.main}
        onClick={(event) => {
          event.preventDefault();
          dispatch(getCurrentChallengeDetails(id));

          navigate("/details");
        }}
      >
        <StyledImageBox id="styledImageBox"></StyledImageBox>

        <Stack
          padding="30px 20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <Box
            width="130px"
            style={{
              backgroundColor: bgnSelector(status),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3px",
              border: "none",
              borderRadius: "10px",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            {status}
          </Box>
          <Box
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {tittle}
          </Box>
          {status === "upcoming" && (
            <Counter text="Starts In" t1={t1} t2={t2} t3={t3} />
          )}
          {status === "active" && (
            <Counter text="Ends In" t1={t1} t2={t2} t3={t3} />
          )}
          {status === "past" && (
            <Stack textAlign={"center"}>
              <Box>Ended on</Box>
              <Box fontWeight={"bolder"}>
                {dayjs(challenegeData.endDate).format(" DD MMM'YY h:mm A")}
              </Box>
            </Stack>
          )}

          {/* Time stamp */}
          <Button
            onClick={(event) => {
              event.preventDefault();

              navigate("/participate");
            }}
            variant="contained"
            style={{
              borderRadius: "10px",
              textTransform: "capitalize",
              padding: 0,
            }}
          >
            <TaskAltIcon
              style={{
                padding: "4px",
                display: "inline",
              }}
            />
            <span
              style={{
                padding: "4px 6px",
              }}
            >
              Participate Now
            </span>
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default BottomCard;
