import { FC, useEffect, useState } from "react";
import { Card, CardHeader, IconButton, CardMedia, Typography, makeStyles } from "@material-ui/core";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Skeleton from '@material-ui/lab/Skeleton';

import { Driver } from "../pages/Drivers";
import AnimatedContainer from "./AnimatedContainer";

type DriverCardProps = {
  driver: Driver;
}

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    flex: '1',
    margin: '0 auto',
    maxHeight: '300px',
    maxWidth: '250px',
  },
  cardHeader: {
    flex: '1',
  }
}));

const DriverCard: FC<DriverCardProps> = ({ driver }) => {
  const [driverImageSrc, setDriverImageSrc] = useState('');
  const storage = getStorage();
  const normalisedDriverName = `${driver.givenName}-${driver.familyName}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
  const driverPathReference = ref(storage, `${normalisedDriverName}-1.png`);
  const classes = useStyles();

  useEffect(() => {
    getDownloadURL(driverPathReference).then(url => {
      setDriverImageSrc(url);
    });
  }, [driverPathReference])

  return (
    <AnimatedContainer>
      <Card className={classes.card} variant="outlined">
        {driverImageSrc ? (
          <CardMedia
            className={classes.cardImage}
            component="img"
            src={driverImageSrc}
          />
        ) : (
          <Skeleton variant="rect" height={300} />
        )
        }
        <CardHeader
          className={classes.cardHeader}
          title={
            <Typography noWrap variant="h5">
              {driver.givenName} {driver.familyName}
            </Typography>
          }
          action={
            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>
          }
        />
      </Card>
    </AnimatedContainer>
  )
}

export default DriverCard;