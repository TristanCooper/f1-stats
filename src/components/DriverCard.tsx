import { FC, useEffect, useState } from "react";
import { Card, CardHeader, IconButton, CardMedia } from "@material-ui/core";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Skeleton from '@material-ui/lab/Skeleton';

import { Driver } from "../pages/Drivers";
import AnimatedContainer from "./AnimatedContainer";

type DriverCardProps = {
  driver: Driver;
}

const DriverCard: FC<DriverCardProps> = ({ driver }) => {
  const [driverImageSrc, setDriverImageSrc] = useState('');
  const storage = getStorage();
  const normalisedDriverName = `${driver.givenName}-${driver.familyName}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
  const driverPathReference = ref(storage, `${normalisedDriverName}-1.png`);

  useEffect(() => {
    getDownloadURL(driverPathReference).then(url => {
      setDriverImageSrc(url);
    });
  }, [driverPathReference])

  return (
    <AnimatedContainer>
      <Card variant="outlined">
        <CardHeader
          title={`${driver.givenName} ${driver.familyName}`}
          action={
            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>
          }
        />
        {driverImageSrc ? (
          <CardMedia
            component="img"
            height="300"
            src={driverImageSrc}
          />
        ) : (
          <Skeleton variant="rect" height={300} />
        )
        }
      </Card>
    </AnimatedContainer>
  )
}

export default DriverCard;