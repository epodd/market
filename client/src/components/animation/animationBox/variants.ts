export type VariantsAnimationTypes = keyof typeof variantsAnimation;

export const variantsAnimation = {
  pageAnimation: {
    init: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hidden: {
      opacity: 0,
      y: 250,
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  },
  deleteElementFromList: {
    init: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  },
  blockAnimation: {
    visible: {
      opacity: 1,
      height: "fit-content",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hidden: {
      height: 0,
      opacity: 0,
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  },
  sidebarAnimation: {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 0,
      x: -150,
    },
  },
  headerAnimation: {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 0,
      y: -20,
    },
    exit: { y: -50, opacity: 0, transition: { duration: 0.4 } },
  },
  sizingImage: {
    visible: {
      opacity: 1,
      width: "100vw",
      height: "100vh",
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 1,
      width: "100%",
      height: "100%",
      transition: { duration: 0.4 },
    },
  },
  filterModal: {
    visible: {
      transform: "translateX(0%)",
      transition: { duration: 0.2 },
    },
    hidden: {
      transform: "translateX(120%)",
      transition: { duration: 0.2 },
    },
    exit: {
      transform: "translateX(120%)",
      transition: { duration: 0.2 },
    },
  },
  labelAnimation: {
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
  },
  headerDropdown: {
    visible: {
      height: "fit-content",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  overlayAnimation: {
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  deleteProductFromCart: {
    visible: {
      transition: { duration: 0.5 },
    },
    hidden: {
      transition: { duration: 0.5 },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  },
};
