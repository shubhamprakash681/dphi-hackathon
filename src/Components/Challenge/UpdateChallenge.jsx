import styled from "@emotion/styled";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";

import dayjs from "dayjs";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  createChallenge,
  getCurrentChallengeDetails,
  updateChallengeById,
} from "../../actions/challengesActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateChallenge = () => {
  const StyledLabel = styled("label")(({ theme }) => ({
    display: "block",
  }));

  const replaceChar = (origString, replaceChar, index) => {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);

    let newString = firstPart + replaceChar + lastPart;
    return newString;
  };

  const setSecondsToZero = (date) => {
    var colonCount = 0;
    var i = 0;
    for (var i; i < date.length; i++) {
      if (date[i] === ":") {
        colonCount++;
      }
      if (colonCount === 2) {
        break;
      }
    }
    date = replaceChar(date, "0", i + 1);
    date = replaceChar(date, "0", i + 2);

    return date;
  };

  const currentTimeGenerator = () => {
    let d = dayjs(new Date()).format();
    d = setSecondsToZero(d);

    // console.log("dayjs with zero seconds:- ", d);
    return d;
  };

  const stateVar = useSelector((state) => state.myReducers);

  const [id, setId] = useState();
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState(currentTimeGenerator());
  const [endDate, setEndDate] = useState(currentTimeGenerator());
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [level, setLevel] = useState("easy");
  const [bannerImageURL, setBannerImageURL] = useState();

  useEffect(() => {
    const currentChallengeId = stateVar.challengeReducer.currentChallengeID;

    if (currentChallengeId !== 0) {
      // console.log("UPDATE CHALLENGE");
      const allChallenges = stateVar.challengeReducer.challenges;

      const currentChallenge = allChallenges.filter((item) => {
        return item.id === currentChallengeId;
      });
      // console.log("here, ", currentChallenge[0]);

      setId(currentChallenge[0].id);
      setChallengeName(currentChallenge[0].challengeName);
      setStartDate(currentChallenge[0].startDate);
      setEndDate(currentChallenge[0].endDate);
      setDescription(currentChallenge[0].description);
      setLevel(currentChallenge[0].level);
      setOverview(currentChallenge[0].overview);
      setBannerImageURL(currentChallenge[0].bannerImageURL);
    } else {
      // console.log("CREATE CHALLENGE");

      setId(0);
    }
  }, [stateVar]);

  const onBannerImageChange = ({ base64 }) => {
    // console.log(base64);
    setBannerImageURL(base64);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Box
        style={{
          padding: "30px",
          fontSize: "x-large",
          backgroundColor: "#f8f9fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Challenge Details</span>
        <Button variant="contained" type="submit">
          <Link
            to={"/"}
            className="link"
            style={{
              color: "white",
            }}
          >
            Home
          </Link>
        </Button>
      </Box>
      <Box
        style={{
          padding: "20px 30px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (id === 0) {
              // Dispatch Create challenge
              dispatch(
                createChallenge(
                  challengeName,
                  startDate,
                  endDate,
                  description,
                  overview,
                  level,
                  bannerImageURL
                )
              );
              toast("Created Successfully");
            } else {
              // Dispatch Update Challenge
              dispatch(
                updateChallengeById(
                  id,
                  challengeName,
                  startDate,
                  endDate,
                  description,
                  overview,
                  level,
                  bannerImageURL
                )
              );
              toast("Updated Successfully");

              // Resetting states back to initial
              dispatch(getCurrentChallengeDetails(0));
              // console.log("resetted");
            }

            setChallengeName("");
            setStartDate(currentTimeGenerator());
            setEndDate(currentTimeGenerator());
            setDescription("");
            setOverview("");
            setLevel("easy");
            setBannerImageURL();
          }}
        >
          <Stack spacing={2}>
            <Box marginTop={"30px"}>
              <StyledLabel>Challenge Name</StyledLabel>
              <input
                className="form-input-fields"
                type="text"
                required
                value={challengeName}
                onChange={(event) => {
                  setChallengeName(event.target.value);
                }}
              />
            </Box>

            <Box>
              <StyledLabel>Start Date</StyledLabel>
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className="form-input-fields"
                  label="Start Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={startDate}
                  required
                  onChange={(date) => {
                    setStartDate(setSecondsToZero(dayjs(date).format()));
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <StyledLabel>End Date</StyledLabel>
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className="form-input-fields"
                  label="End Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={endDate}
                  required
                  onChange={(date) => {
                    // console.log(dayjs(date).format());
                    setEndDate(setSecondsToZero(dayjs(date).format()));
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <StyledLabel>Description</StyledLabel>
              <textarea
                className="form-input-fields"
                id="description"
                name="description"
                rows={"5"}
                cols={"15"}
                value={description}
                required
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </Box>

            <Box>
              <StyledLabel>Overview</StyledLabel>
              <textarea
                className="form-input-fields"
                id="overview"
                name="overview"
                rows={"5"}
                cols={"33"}
                value={overview}
                required
                onChange={(event) => setOverview(event.target.value)}
              ></textarea>
            </Box>

            <Box>
              <StyledLabel>Image</StyledLabel>
              {bannerImageURL && (
                <>
                  <Box>
                    <img
                      src={bannerImageURL}
                      alt={"Banner"}
                      style={{
                        width: "200px",
                        padding: "20px 40px",
                        backgroundColor: "rgba(83,147,76, 0.102)",
                        borderRadius: "10px",
                        margin: "10px",
                      }}
                    />
                  </Box>
                </>
              )}
              {/* <input
                // className="form-input-fields"
                type={"file"}
                onChange={onBannerImageChange}
              /> */}

              <FileBase64 multiple={false} onDone={onBannerImageChange} />
            </Box>

            <Box>
              <StyledLabel>Level Type</StyledLabel>
              <Select
                className="form-input-fields"
                size="small"
                labelId="level-label"
                id="level"
                value={level}
                label="Level"
                onChange={(lev) => {
                  setLevel(lev.target.value);
                }}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </Box>
          </Stack>

          <Button
            variant="contained"
            type="submit"
            style={{
              marginTop: "20px",
            }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UpdateChallenge;
