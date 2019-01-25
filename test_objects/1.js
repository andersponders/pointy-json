let x = {"hello": 1};
let second = {
	world: x
    }
let y = {
    first: x,
    second: second,
    third: {
	second: second
    }
}

module.exports = y;
