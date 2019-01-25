let x = {"hello": 1};
let y = {
    first: x,
    second: {
	world: x
    }
}

module.exports = y;
