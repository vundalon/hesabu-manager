import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Chip, Typography } from "@material-ui/core";
import classNames from "classnames";
import LinkIcon from "@material-ui/icons/Link";
import PropTypes from "prop-types";
import ReactTimeAgo from "react-time-ago";
import humanizeDuration from "humanize-duration";
import { DuoToneChip, HorizontalBulletList } from "@blsq/manager-ui";
import useStyles from "./styles";
import SimulationStateIcon from "../SimulationStateIcon";

const humanDuration = milliSeconds => {
  return humanizeDuration(milliSeconds);
};

const SimulationListItem = props => {
  const classes = useStyles();
  const {
    createdAt,
    durationMs,
    orgUnitName: title,
    dhis2Period: period,
    orgUnit,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <SimulationStateIcon {...props} />
        <Typography
          variant="subtitle1"
          component={Link}
          to={`/simulation?periods=${period.trim()}&orgUnit=${orgUnit}`}
          className={classes.sectionTitle}
        >
          {title}
        </Typography>
      </div>
      <HorizontalBulletList className={classes.subtitle}>
        <Typography component="li" variant="body2">
          <ReactTimeAgo date={createdAt} />
        </Typography>
        <Typography component="li" variant="body2">
          {humanDuration(durationMs)}
        </Typography>
      </HorizontalBulletList>
      <DuoToneChip
        label={orgUnit}
        size="small"
        avatar={<LinkIcon />}
        className={classNames(classes.groupChip, classes.chips)}
      />
      <Chip
        label={period}
        size="small"
        className={classNames(classes.periodChip, classes.chips)}
      />
    </div>
  );
};

SimulationListItem.propTypes = {
  durationMs: PropTypes.number,
  createdAt: PropTypes.string,
  groups: PropTypes.array,
  id: PropTypes.string,
  period: PropTypes.string,
  title: PropTypes.string,
};

export default withRouter(SimulationListItem);
