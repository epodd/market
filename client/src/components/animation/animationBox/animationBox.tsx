import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { memo, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { variantsAnimation, VariantsAnimationTypes } from "./variants";

const MotionDiv = styled(motion.div)`
  width: 100%;
  height: auto;
  display: inherit;
  justify-content: inherit;
  flex-direction: inherit;
  align-items: inherit;
  position: relative;
  left: 0;
  right: 0;
`;

export const AnimationBox = memo(
  ({
    children,
    variantAnimation,
    initial,
    controlOn,
     click,
  }: {
    initial?: string;
    controlOn?: boolean;
    click?: boolean;
    children: ReactNode;
    variantAnimation: VariantsAnimationTypes;
  }) => {
    const control = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
      if (inView && initial === undefined) {
        control.start("visible");
      }

      if (initial !== undefined) {
        control.start(initial);
      }
    }, [control, inView, initial]);

    return (
      <MotionDiv
        ref={ref}
        className="animateBox"
        initial="hidden"
        animate={controlOn ? control : "visible"}
        exit="exit"
        variants={variantsAnimation[variantAnimation]}
      >
        {children}
      </MotionDiv>
    );
  }
);

export const AnimationPresenceBox = memo(
  ({
    children,
    variantAnimation,
    renderWhen,
  }: {
    children: ReactNode;
    renderWhen: boolean;
    variantAnimation: VariantsAnimationTypes;
  }) => {
    return (
      <AnimatePresence mode="wait" initial={true}>
        {renderWhen && (
          <AnimationBox variantAnimation={variantAnimation}>
            {children}
          </AnimationBox>
        )}
      </AnimatePresence>
    );
  }
);
