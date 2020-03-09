// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules/21247500

export default Object.freeze({
    SVG_WIDTH = 400,
    SVG_HEIGHT = 400,
    CENTER_X = SVG_WIDTH / 2,
    CENTER_Y = SVG_HEIGHT / 2,
    RADIUS = SVG_WIDTH / 2 - 20,
    CIRCLE_STROKE_WIDTH = 10,
    WHEEL_SCROLL_VALUE = Math.round(280 / 30),
});