import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import firebase from "firebase";
import { Grid, Box } from "@material-ui/core";
// import { TodosContext } from "../contexts/userContext";

// export function Home({ match }) {
//   // fetch("/api/articles/...", {
//   //   method: "POST",
//   //   body: {},
//   // });

//   const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

//   const name = match.params.name;

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result = await fetch(`/api/articles/${name}/upvote`, {
//   //       method: "post",
//   //     });
//   //     const body = await result.json();
//   //     setArticleInfo(body);
//   //   };
//   //   fetchData();
//   // }, [name]);

//   if (!name) return <h1>hello</h1>;

//   return (
//     <>
//       <h1>Product {name} List!</h1>
//       <p> This post has been upvoted {articleInfo.upvotes} times</p>
//     </>
//   );
// }

export function Home({ auth }) {
  // const initialized = this.context;

  const { user, changeUser } = useContext(UserContext);

  if (JSON.parse(user).initialized) {
    return (
      <Grid
        maxWidth="md"
        justifyContent="centre"
        alignItems="center"
        alignContent="center"
      >
        <Box
          m={2}
          style={{
            maxWidth: "800px",
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            justifyContent: "centre",
            alignContent: "center",
          }}
        >
          <RecipeReviewCard
            style={{ justifyContent: "centre", alignContent: "center" }}
          />
        </Box>
        <Box
          m={2}
          style={{
            maxWidth: "800px",
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            justifyContent: "centre",
            alignContent: "center",
          }}
        >
          <RecipeReviewCard
            style={{ justifyContent: "centre", alignContent: "center" }}
          />
        </Box>
        <Box
          m={2}
          style={{
            maxWidth: "800px",
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            justifyContent: "centre",
            alignContent: "center",
          }}
        >
          <RecipeReviewCard
            style={{ justifyContent: "centre", alignContent: "center" }}
          />
        </Box>
      </Grid>
    );
  } else {
    return <Login />;
  }

  // return <h1>{JSON.parse(user).name}</h1>;
  // return <h1>ISIJ Niyaz Delivery</h1>;

  // if (firebase.auth().currentUser) {
  //   return (
  //     <>
  //       {" "}
  //       <p>
  //         Welcome {firebase.auth().currentUser.displayName}! You are now
  //         signed-in!
  //       </p>{" "}
  //     </>
  //   );
  // } else {
  //   return (
  //     <div>
  //       {/* <h1>home</h1>
  //     {isAuthenticated() && (
  //       <h4>
  //         You are logged in! You can now view your{" "}
  //         <Link to="/profile">profile</Link>
  //       </h4>
  //     )} */}
  //     </div>
  //   );
  // }
}
// export default Home;
