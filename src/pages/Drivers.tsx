import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Container, Paper } from "@material-ui/core";

import DriverCard from "../components/DriverCard";

export type Driver = {
  driverId: string;
  driverImageUrl: string;
  givenName: string;
  familyName: string;
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[] | []>([]);

  useEffect(() => {
    fetch('http://ergast.com/api/f1/current/drivers.json')
      .then(response => response.json())
      .then(data => {
        const driversData: Driver[] = data.MRData.DriverTable.Drivers;
        return driversData.map(driverData => {
          return {
            ...driverData,
            driverImageUrl: `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${driverData.givenName}_${driverData.familyName}&prop=pageimages&format=json&pithumbsize=1000`
          }
        })
      })
      .then(result => setDrivers(result))
  }, []);

  return (
    <div>
      <Typography
        variant="h2"
        color="textPrimary"
        align="center"
        gutterBottom
      >
        Drivers
      </Typography>

      <Container>
        <Grid container spacing={3}>
          {drivers.map(driver => (
            <Grid key={driver.driverId} item xs={12} sm={6} md={3}>
              <DriverCard driver={driver} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}