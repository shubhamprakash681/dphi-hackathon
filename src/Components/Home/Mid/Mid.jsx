import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DetailsCards from "./DetailsCards";
import a from "../../../assets/icons/carbon_notebook-reference.svg";
import b from "../../../assets/icons/Vector.svg";
import c from "../../../assets/icons/Robot.svg";
import d from "../../../assets/icons/IdentificationCard.svg";
import { theme } from "../../../styles/theme";

const Mid = () => {
  return (
    <>
      <Box width="100%" marginTop={10}>
        <Box
          textAlign="center"
          // p={{ xs: "6% 0", md: "10%" }}
          p={'5vmin'}
          fontSize="xx-large"
        >
          <span className="midHeader">Why participlate in</span>
          <span
            style={{
              color: theme.palette.primary.main,
            }}
            className="midHeader"
          >
            AI Challanges?
          </span>
        </Box>

        <Grid p={{xs:4, lg: 10 }} container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} lg={6} key={11}>
            <DetailsCards
              key={111}
              iconUri={a}
              heading="Prove your skills"
              description="Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
            />
          </Grid>
          <Grid item xs={12} lg={6} key={12}>
            <DetailsCards
              key={112}
              iconUri={b}
              heading="Learn from community"
              description="One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
            />
          </Grid>
          <Grid item xs={12} lg={6} key={13}>
            <DetailsCards
              key={113}
              iconUri={c}
              heading="Challenge yourself"
              description="There is nothing for you to loose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
            />
          </Grid>
          <Grid item xs={12} lg={6} key={14}>
            <DetailsCards
              key={114}
              iconUri={d}
              heading="Earn recognition"
              description="You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earn rewards."
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Mid;
