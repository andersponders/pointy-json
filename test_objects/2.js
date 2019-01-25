let x = {"hello": 1};
let y = {"hello": x};
x["hello"] = y;

module.exports = {
    x: x,
    y: y
};
