import React, { useRouteMatch } from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DinnerCard = ({ dinner, url }) => {
  const { from, id, header, description, address, dateTime, host } = dinner;

  return (
    <Grid.Column>
      <Card
        as={Link}
        to={`${url}/${id}`}
        header={header}
        meta={host.username}
        description={description}
      />
    </Grid.Column>
  );
};

export default DinnerCard;
