import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import DetailsPage from "./Components/Challenge/DetailsPage";
import UpdateChallenge from "./Components/Challenge/UpdateChallenge";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllChallenges } from "./actions/challengesActions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticipationPage from "./Components/Challenge/ParticipationPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch]);

  return (
    // clock state

    <>
      <Box>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/create" element={<UpdateChallenge />} />
            <Route path="/update" element={<UpdateChallenge />} />
            <Route path="/participate" element={<ParticipationPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
