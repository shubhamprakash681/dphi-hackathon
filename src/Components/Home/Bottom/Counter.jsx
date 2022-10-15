import { Box, Stack } from "@mui/material";
import React from "react";

const Counter = ({ text = "Starts in", t1 = "00", t2 = "00", t3 = "00" }) => {
  return (
    <Stack textAlign={"center"}>
      <Box>{text}</Box>
      <Stack direction={"row"} textAlign={"center"}>
        <Stack>
          <Box fontWeight={"bolder"}>{t1}</Box>
          <Box>Days</Box>
        </Stack>
        <Stack>
          <Box fontWeight={"bolder"}>:</Box>
          <Box> </Box>
        </Stack>
        <Stack>
          <Box fontWeight={"bolder"}>{t2}</Box>
          <Box>Hours</Box>
        </Stack>
        <Stack>
          <Box fontWeight={"bolder"}>:</Box>
          <Box> </Box>
        </Stack>
        <Stack>
          <Box fontWeight={"bolder"}>{t3}</Box>
          <Box>Mins</Box>
        </Stack>
        {/* <Box>{clockState}</Box> */}
      </Stack>
    </Stack>
  );
};

export default Counter;
