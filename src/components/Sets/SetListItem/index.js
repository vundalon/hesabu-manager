import { withRouter, Link } from "react-router-dom";
import React, { useState } from "react";
import { Chip, Typography, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import styles from "./styles";

const SetListItem = props => {
  const classes = styles();
  const [expanded, setExpanded] = useState(false);

  const {
    name,
    orgUnitGroups,
    id,
    topics,
    kind,
    frequency,
    description,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography
          component={Link}
          to={`/sets/${id}/topic_formulas`}
          variant="subtitle1"
          className={classes.sectionTitle}
        >
          {name}
        </Typography>
        {!!topics.length && (
          <IconButton
            className={classes.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </div>
      <Chip label={kind} className={classes.groupChip} />
      <Chip label={frequency} className={classes.groupChip} />
      {orgUnitGroups.map((group, index) => (
        <Chip
          key={`${index}-group`}
          label={group.name}
          className={classes.groupChip}
        />
      ))}
      <Typography>{description}</Typography>
      {expanded && !!topics.length && (
        <Typography variant="subtitle1" className={classes.description}>
          {topics.map(topic => topic.name).join(", ")}
        </Typography>
      )}
    </div>
  );
};

SetListItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  groupNames: PropTypes.array,
  name: PropTypes.string,
  orgUnitGroups: PropTypes.array,
  topics: PropTypes.array,
};

SetListItem.defaultProps = {
  groups: [],
};

export default withRouter(SetListItem);
