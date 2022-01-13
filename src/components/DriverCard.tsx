import React, { FC, useEffect, useState, useRef, RefObject } from "react";
import { Card, CardHeader, CardContent, IconButton, CardMedia, CircularProgress } from "@material-ui/core";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Skeleton from '@material-ui/lab/Skeleton';

import { Driver } from "../pages/Drivers";
import AnimatedContainer from "./AnimatedContainer";

type DriverCardProps = {
  driver: Driver;
}

const DriverCard: FC<DriverCardProps> = ({ driver }) => {
  const [driverImageSrc, setDriverImageSrc] = useState('');

  useEffect(() => {
    fetch(driver.driverImageUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const driverImageBlock = Object.keys(data.query.pages)[0];
        setDriverImageSrc(data.query.pages[driverImageBlock].thumbnail.source);
      })
  }, [driver.driverImageUrl])

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