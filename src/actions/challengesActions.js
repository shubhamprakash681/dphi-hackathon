import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase/firabase";

// firestore
const db = getFirestore(firebaseApp);
const allChallengesQuery = query(collection(db, "Challenges"));

// export const funcName = () => async (dispatch) => {
//   try {
//     // action for backend (api or firebase function call)
//     // action for frontend (dispatching)
//     // dispatch({ type: FETCH_ALL, payload: data.allPosts });
//   } catch (err) {
//     console.log(err);
//   }
// };

const currentTimeGenerator = () => {
  let d = dayjs(new Date(Date.now())).format();

  return d;
  // console.log(d);
};

export const getAllChallenges = () => (dispatch) => {
  try {
    onSnapshot(allChallengesQuery, (snap) => {
      let allChallenges = [];
      snap.docs.forEach((item) => {
        const id = item.id;
        const data = item.data();

        allChallenges.push({ id, ...data });
      });

      dispatch({
        type: "GET_ALL",
        payload: allChallenges,
      });
    });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

export const createChallenge =
  (
    challengeName,
    startDate,
    endDate,
    description,
    overview,
    level,
    bannerImageURL
  ) =>
  async (dispatch) => {
    try {
      // console.log("here", challengeName);
      await addDoc(collection(db, "Challenges"), {
        challengeName,
        startDate,
        endDate,
        description,
        overview,
        level,
        bannerImageURL,
        timeStamp: currentTimeGenerator(),
      });
      //    TODO: render a modal here
      console.log(`Created successfully`);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

export const getCurrentChallengeDetails = (id) => (dispatch) => {
  // console.log("In actions, id= ", id);

  dispatch({
    type: "SET_CURRENT_CHALLENGE",
    payload: id,
  });
};

export const updateChallengeById =
  (
    id,
    challengeName,
    startDate,
    endDate,
    description,
    overview,
    level,
    bannerImageURL
  ) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "Challenges", id), {
        challengeName,
        startDate,
        endDate,
        description,
        overview,
        level,
        bannerImageURL,
        timeStamp: currentTimeGenerator(),
      });
      //    TODO: render a modal here
      console.log("updated successfully");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

export const deleteChallenge = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "Challenges", id));

    console.log("Deleted successfully");
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
