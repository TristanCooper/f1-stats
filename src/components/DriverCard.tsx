import React, { FC, useEffect, useState, useRef, RefObject } from "react";
import { Card, CardHeader, CardContent, IconButton, CardMedia, CircularProgress } from "@material-ui/core";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Skeleton from '@material-ui/lab/Skeleton';

import { Driver } from "../pages/Drivers";

type DriverCardProps = {
  driver: Driver;
}

type DriverImageUrlBlock = {
  thumbnail: {
    source: string;
  }
}

const DriverCard: FC<DriverCardProps> = ({ driver }) => {
  let constrain = 20;
  let mouseOverContainerRef = useRef<HTMLDivElement>(null);
  let transformingLayerRef = useRef<HTMLElement>(null);

  function transforms(x: number, y: number, el: RefObject<HTMLElement>) {
    let box = el.current && el.current.getBoundingClientRect();
    let calcX;
    let calcY;

    if (box && box.y && box.x) {
      calcX = -(y - box.y - (box.height / 2)) / constrain;
      calcY = (x - box.x - (box.width / 2)) / constrain;
    }

    return "perspective(750px) "
      + "   rotateX(" + calcX + "deg) "
      + "   rotateY(" + calcY + "deg) ";
  };

  const transformElement = (el: RefObject<HTMLElement>, xyEl: any) => {
    el.current && el.current.style.setProperty('transform', transforms.apply(null, xyEl));
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    let xy: (number | RefObject<HTMLElement>)[] = [e.clientX, e.clientY];
    let position = xy.concat([transformingLayerRef]);

    requestAnimationFrame(function () {
      transformElement(transformingLayerRef, position);
    });
  }

  const mouseLeaveHandler = (e: React.MouseEvent) => {
    requestAnimationFrame(function () {
      transformingLayerRef.current && transformingLayerRef.current.style.setProperty('transform', 'none');
    });
  }


  const [driverImageSrc, setDriverImageSrc] = useState('');

  useEffect(() => {
    fetch(driver.driverImageUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        // const url = Object.values(data.query.pages)[0];
        const driverImageBlock = Object.keys(data.query.pages)[0];
        console.log('awdwa', driverImageBlock)
        setDriverImageSrc(data.query.pages[driverImageBlock].thumbnail.source);
      })
  }, [driver.driverImageUrl])

  return (
    <div ref={mouseOverContainerRef}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Card variant="outlined" ref={transformingLayerRef}>
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
    </div>
  )
}

export default DriverCard;