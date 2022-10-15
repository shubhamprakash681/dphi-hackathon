// import {
//   addDoc,
//   collection,
//   getFirestore,
//   onSnapshot,
//   query,
//   serverTimestamp,
// } from "firebase/firestore";

// import { firebaseApp } from "./firabase";

// const db = getFirestore(firebaseApp);

//  const createChallenge =
//   (
//     challengeName,
//     startDate,
//     endDate,
//     description,
//     overview,
//     level,
//     bannerImageURL
//   ) =>
//   async (event) => {
//     // to prevent page reloading on form data submission
//     event.preventDefault();

//     try {
//       await addDoc(collection(db, "Challenges"), {
//         challengeName,
//         startDate,
//         endDate,
//         description,
//         overview,
//         level,
//         bannerImageURL,
//         timeStamp: serverTimestamp(),
//       });

//       //    TODO: render a modal here
//       console.log(`Uploaded successfully`);
//     } catch (err) {
//       console.log(err);
//       alert(err);
//     }
//   };

// const allChallengesQuery = query(collection(db, "Challenges"));
// export const loadAllChallenges = () => {
//   let allChallenges = [];

//   onSnapshot(allChallengesQuery, (snap) => {
//     snap.docs.forEach((item) => {
//       const id = item.id;
//       const data = item.data();
//       //   console.log(item.id);
//       allChallenges.push({ id, ...data });
//     });
//     console.log("returning this, ", allChallenges);
//     return allChallenges;
//   });
// };
