import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { DinnerContext } from "../../context/dinner-context";
import axios from "axios";
import DinnerCard from "./DinnerCard";
import { Grid } from "semantic-ui-react";
import DinnerDetail from "./DinnerDetail";

export default function DinnerList() {
  const [state, dispatch] = useContext(DinnerContext);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://192.168.86.66:8000/api/dinnerEvent/");
      dispatch({
        type: "GET_DINNERS",
        payload: result.data,
      });
    };
    fetchData();
  }, []);

  const dinnerCards = state.dinners.map((dinner) => (
    <DinnerCard key={dinner.id} dinner={dinner} url={url} />
  ));

  return (
    <Fragment>
      <Route path={`${path}/:dinnerId`}>
        <DinnerDetail />
      </Route>
      <Route exact path={url}>
        <Grid stackable columns={3}>
          {dinnerCards}
        </Grid>
      </Route>
    </Fragment>
  );
}
