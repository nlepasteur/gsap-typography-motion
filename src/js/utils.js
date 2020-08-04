// Preload images
export const preloadFonts = (id) => {
  return new Promise((resolve, reject) => {
    WebFont.load({
      typekit: {
        id: id,
      },
      active: resolve,
    });
  });
};
