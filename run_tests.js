const pointy_json = require('./index');
const fs = require('fs');

const test_case_files = fs.readdirSync("./test_objects");


function prettyPrint(objects) {
    console.log("[")
    objects.forEach((obj) => {
	console.log(JSON.stringify(obj));
    });
    console.log("]");
}

test_case_files.forEach((file) => {
    let obj = require('./test_objects/' + file);
    console.log(obj);
    console.log("\n");

    let distinctObjects = pointy_json.traverseObject(obj, [], []);

    let encoded = pointy_json.encode(obj);
    console.log(JSON.stringify(encoded));
    console.log("\n");

    let decoded = pointy_json.decode(encoded);
    console.log(decoded);
    console.log("\n\n");
});
