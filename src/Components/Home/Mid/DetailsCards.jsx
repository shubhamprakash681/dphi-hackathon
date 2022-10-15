import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { theme } from "../../../styles/theme";

const DetailsCards = ({ iconUri, heading, description }) => {
  return (
    <>
      <Box padding={0}>
        <Card
          style={{
            backgroundColor: theme.palette.background.Card,
            borderRadius: "30px",
          }}
        >
          <CardContent p={0}>
            <Box className="detCardCont">
              <img src={iconUri} alt="icon" />
            </Box>
            <Typography className="detCardCont" variant="h3">
              {heading}
            </Typography>

            <Typography className="detCardCont" variant="h5">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DetailsCards;
