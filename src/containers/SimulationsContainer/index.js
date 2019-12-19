import { Typography, CircularProgress } from "@material-ui/core";

import React, { Fragment, useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import PageContent from "../../components/Shared/PageContent";
import TopBar from "../../components/Shared/TopBar";
import SimulationList from "../../components/Simulations/SimulationList";
import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import useStyles from "./styles";
import { formattedName } from "../../utils/textUtils";
import { externalApi } from "../../actions/api";

const SimulationsContainer = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [simulations, setSimulations] = useState([]);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/simulations`)
      .get()
      .json(response => {
        setLoading(false);
        setSimulations(response.data);
        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setSimulations(null);
      });
  }, []);

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
        {// #TODO replace with centered component
        loading && <CircularProgress />}
        {errorMessage && (
          <InfoBox name="simulations-fetch-errors" dismissable={false}>
            {errorMessage}
          </InfoBox>
        )}
        <SimulationList simulations={simulations} />
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

export default withTranslation("translations")(SimulationsContainer);
