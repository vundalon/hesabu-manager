import { Typography } from "@material-ui/core";

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PageContent from "../../components/Shared/PageContent";
import { withTranslation, useTranslation } from "react-i18next";
import TopBar from "../../components/Shared/TopBar";
import SimulationList from "../../components/Simulations/SimulationList";

import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import useStyles from "./styles";
import SimulationContainer from "../SimulationContainer";
import { formattedName } from "../../utils/textUtils";

const SimulationsContainer = props => {
  const { simulations } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {formattedName(t("resources.simulation_plural"))}
        </Typography>
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent>
        <SimulationList simulations={simulations} />
        <SimulationContainer />
      </PageContent>
      <SideSheet
        title={t("filtersSheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <p>
          Here will be content to filter the left side of the screen. Similar to
          sets.
        </p>
      </SideSheet>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  simulations: [
    {
      id: "1234",
      name: "SIGL BCZ FOSA Coherence, COSPRO - A.3 - Bureaux Administratifs",
      groupNames: ["BCZs"],
      createdAt: "2019-11-02T18:25:43.511Z",
      buildDuration: 240,
      period: "Q3 - 2019",
    },
    {
      id: "1234",
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      createdAt: "2019-10-02T18:25:43.511Z",
      buildDuration: 108,
      period: "Q2 - 2019",
    },
    {
      id: "1234",
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      createdAt: "2019-10-06T18:25:43.511Z",
      buildDuration: 53,
      period: "Q1 - 2018",
    },
  ],
});

export default withTranslation("translations")(
  connect(mapStateToProps)(SimulationsContainer),
);
