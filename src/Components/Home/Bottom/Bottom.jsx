import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BottomCard from "./BottomCard";

import { theme } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const status = ["all", "active", "upcoming", "past"];
const levels = ["easy", "medium", "hard"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Bottom = () => {
  const { challenges } = useSelector(
    (state) => state.myReducers.challengeReducer
  );
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  let [localChallenges, setLocalChallenges] = useState(challenges);

  // search
  const [searchString, setSearchString] = useState();
  const searchHandler = useCallback((e, newValue) => {
    setSearchString(newValue);
  });

  // filter
  const [selectedOptions, setSelectedOptions] = useState(["all", "easy"]);
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const runFilter = () => {
    if (selectedOptions.includes("all")) {
      // return all
      setLocalChallenges(challenges);
      return;
    }

    let temp = [];
    selectedOptions.forEach((op) => {
      challenges.forEach((ch) => {
        if (ch.status === op && !temp.includes(ch)) {
          temp.push(ch);
        }
      });
    });

    // console.log("temp: ", temp);

    // checking for levels i selectedOptions
    let found = 0;
    ["easy", "medium", "hard"].forEach((op) => {
      if (selectedOptions.includes(op)) {
        found = 1;
      }
    });

    if (found === 1) {
      // console.log("found");

      let temp2 = [];
      temp.forEach((ch) => {
        if (selectedOptions.includes(ch.level)) {
          temp2.push(ch);
        }
      });
      // console.log("temp2: ", temp2);

      setLocalChallenges(temp2);
    } else {
      // console.log("not found");
      setLocalChallenges(temp);
    }
  };

  // sort
  const [selectedSort, setSelectedSort] = useState("asc");
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const runSort = () => {
    if (loaded === true) {
      let temp = localChallenges.slice();

      if (selectedSort === "asc") {
        temp.sort((a, b) => {
          return dayjs(b.startDate) - dayjs(a.startDate);
        });
      } else {
        temp.sort((a, b) => {
          return dayjs(a.startDate) - dayjs(b.startDate);
        });
      }
      // console.log("temp: ", temp);
      setLocalChallenges(temp);
    }
  };

  useEffect(() => {
    // console.log("selectedOptions: ", selectedOptions);
    // console.log("selectedSort: ", selectedSort);

    localChallenges = challenges;

    runFilter();

    runSort();
  }, [selectedOptions, loaded]);

  // useEffect(() => {
  //   console.log("state changed");
  //   console.log("state:- ", challenges);
  // }, [dispatch]);

  useEffect(() => {
    runSort();
  }, [selectedSort]);

  useEffect(() => {
    if (challenges.length > 0) {
      setLoaded(true);
    }
  }, [challenges]);

  useEffect(() => {
    // console.log("searchString = ", searchString);
    if (searchString && loaded === true) {
      let temp = [];

      challenges.forEach((item) => {
        if (item.challengeName === searchString) {
          temp.push(item);
        }
      });

      setLocalChallenges(temp);
    }

    if (searchString === null || searchString === undefined) {
      // console.log("null strig g");
      setLocalChallenges(challenges);
      runFilter();
      runSort();
    }
  }, [searchString]);

  return (
    <>
      <Box width="100%">
        <Stack
          textAlign="center"
          p={"5vmin"}
          style={{
            backgroundColor: theme.palette.secondary.light,
            color: "white",
          }}
        >
          <h2 id="bottomHeader">Explore Challenges</h2>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            alignItems={"center"}
            justifyContent={{ xs: "space-evenly", md: "space-between" }}
          >
            <Box width={{ xs: "100%", md: "70%" }}>
              <Box
                display={"flex"}
                alignItems={"center"}
                border="1px solid grey"
                borderRadius="10px"
                backgroundColor={theme.palette.background.main}
                color="black"
              >
                {/* <SearchTwoToneIcon style={{
                  padding: '0 8px'
                }} /> */}
                {challenges && (
                  <Autocomplete
                    fullWidth
                    options={challenges.map((option) => option.challengeName)}
                    freeSolo
                    value={searchString}
                    onChange={searchHandler}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              </Box>
            </Box>

            <Box
              width={{ xs: "100%", md: "30%" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ xs: "space-between", md: "space-evenly" }}
            >
              <FormControl
                style={{
                  backgroundColor: theme.palette.background.main,
                  borderRadius: "8px",
                }}
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="filter-checkbox-label">Filter</InputLabel>
                <Select
                  labelId="filter-checkbox-label"
                  id="ilter-checkbox"
                  multiple
                  value={selectedOptions}
                  onChange={handleFilterChange}
                  input={<OutlinedInput label="Filter" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  <div id="filter-label" className="selectLabels">
                    Filter
                    <ExpandLessIcon />
                  </div>
                  <div className="selectLabels">Status</div>
                  {status.map((st) => (
                    <MenuItem key={st} value={st}>
                      <Checkbox checked={selectedOptions.indexOf(st) > -1} />
                      <ListItemText primary={st} />
                    </MenuItem>
                  ))}

                  <div className="selectLabels">Level</div>
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      <Checkbox checked={selectedOptions.indexOf(level) > -1} />
                      <ListItemText primary={level} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                style={{
                  backgroundColor: theme.palette.background.main,
                  borderRadius: "8px",
                }}
                sx={{ minWidth: 120 }}
                size="small"
              >
                <InputLabel id="sort-checkbox-label">Sort</InputLabel>
                <Select
                  value={selectedSort}
                  label="Sort"
                  labelId="sort-checkbox-label"
                  id="ilter-checkbox"
                  onChange={handleSortChange}
                >
                  <MenuItem value={"asc"}>Newest First</MenuItem>
                  <MenuItem value={"des"}>Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Stack>

        <Grid
          minHeight={"500px"}
          width="100%"
          container
          justifyContent="center"
          alignItems="center"
          padding={"20px 10vmin"}
          spacing={0}
          style={{
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          {loaded === false && (
            <Box
              p={3}
              style={{
                backgroundColor: theme.palette.background.main,
              }}
            >
              <CircularProgress color="success" />
            </Box>
          )}
          {loaded &&
            localChallenges.map((item, index) => (
              <Grid
                padding={"20px 2vmin"}
                fontSize={"x-large"}
                item
                key={index}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
              >
                <BottomCard
                  key={item.id}
                  id={item.id}
                  imageURI={item.bannerImageURL}
                  tittle={item.challengeName}
                />
              </Grid>
            ))}
          {loaded && localChallenges.length === 0 && (
            <Box
              p={3}
              style={{
                backgroundColor: theme.palette.background.main,
              }}
            >
              <Typography
                fontWeight={"bolder"}
                color={theme.palette.primary.main}
              >
                No Such Challenge
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Bottom;
