let x = {y: null};
let y = {x: x};
x.y = y;

module.exports = {
    x: x,
    y: y
};
