import React, { FC, ReactElement, RefObject, useRef } from "react";

type AnimatedContainerProps = {
  children: ReactElement;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({ children }) => {
  let constrain = 20;
  let mouseOverContainerRef = useRef<HTMLDivElement>(null);
  let transformingLayerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={mouseOverContainerRef}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div ref={transformingLayerRef}>
        {children}
      </div>
    </div>
  )
}

export default AnimatedContainer;