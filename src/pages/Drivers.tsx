import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Container, Paper } from "@material-ui/core";

import DriverCard from "../components/DriverCard";
import { makeStyles } from "@material-ui/core/styles";

export type Driver = {
  driverId: string;
  driverImageUrl: string;
  givenName: string;
  familyName: string;
}

const useStyles = makeStyles(theme => ({
  pageContainer: {
    display: 'flex',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  driverContainer: {
    maxHeight: 'calc(100vh - 80px)',
    overflow: 'auto',
    flex: '1'
  },
  infoContainer: {
    flex: '1',
    height: '100%',
  },
}));

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[] | []>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/drivers.json')
      .then(response => response.json())
      .then(data => data.MRData.DriverTable.Drivers)
      .then(result => setDrivers(result))
  }, []);

  return (
    <div>
      <Container className={classes.pageContainer}>
        <Grid className={classes.driverContainer} container spacing={3}>
          {drivers.map(driver => (
            <Grid key={driver.driverId} item xs={12} sm={12} md={6}>
              <DriverCard driver={driver} />
            </Grid>
          ))}
        </Grid>
        <Card className={classes.infoContainer}>
          <CardContent>WIP Driver Info Panel</CardContent>
        </Card>
      </Container>
    </div>
  );
}