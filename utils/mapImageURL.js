export const mapImageURL = (arr) => {
  return arr.map((item) => {
    let img;
    switch (item.image) {
      case "cranialPhoto.jpg":
        img = require("../assets/images/cranialPhoto.jpg");
        break;
      case "PlainLogoItalicsFont.png":
        img = require("../assets/images/PlainLogoItalicsFont.png");
        break;
      case "trx.jpg":
        img = require("../assets/images/trx.jpg");
        break;
      case "weights.jpg":
        img = require("../assets/images/weights.jpg");
        break;
      case "VO2max rower.jpg":
        img = require("../assets/images/VO2max rower.jpg");
        break;
      case "RMR testing.jpg":
        img = require("../assets/images/RMR testing.jpg");
        break;
      case "Gen pop 3.jpg":
        img = require("../assets/images/Gen pop 3.jpg");
        break;
      default:
        img = require("../assets/images/PlainLogoItalicsFont.png");
    }
    return {
      ...item,
      image: img,
    };
  });
};
