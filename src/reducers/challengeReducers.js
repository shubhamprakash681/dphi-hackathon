import { createReducer } from "@reduxjs/toolkit";

const initialChallengesState = {
  challenges: [],
  currentChallengeID: 0,
};

const challengeReducer = createReducer(initialChallengesState, {
  GET_ALL: (state, action) => {
    const l = [];
    action.payload.forEach((d) => {
      l.push(d);
    });
    state.challenges = l;
  },

  SET_CURRENT_CHALLENGE: (state, action) => {
    // console.log("In reducers, id= ", action.payload);

    state.currentChallengeID = action.payload;
  },

  SET_STATUS: (state, action) => {
    const { id, status } = action.payload;

    state.challenges.forEach((item) => {
      if (item.id === id) {
        item.status = status;
      }
    });
  },
});

export default challengeReducer;
