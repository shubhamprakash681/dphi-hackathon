import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TopCard = ({ icon, count, text }) => {
  return (
    <>
      <Box p={5}>
        <Stack direction="row" justifyContent="center" p={2}>
          <div className="icnCont">
            <img src={icon} alt="icon" />
          </div>
          <div className="right">
            <h2>{count}k+</h2>
            <p>{text}</p>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default TopCard;
