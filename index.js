/* copyright (c) 2019  anders wahlberg */

const POINTER_PREFIX = "__pointer@@@"

function traverseObject(x, seenObjects, duplicateObjects) {
    /* X IS AN OBJECT */
    seenObjects.push(x);
    let keys = Object.keys(x);
    keys.forEach(function(key) {
	let value = x[key]
	
	/* we're only worried about objects and arrays (which are also objects) */
	if (typeof value=="object") {
	    
	    if (seenObjects.indexOf(value)!=-1) {
		/* we have alreayd seen it at least once */

		if (duplicateObjects.indexOf(value)==-1) {
		    /* this is the second time we've seen it  */
		    duplicateObjects.push(value);
		}
	    }
	    else {
		/* we've never seen it before */
		
		/* RECURSION - we only recur when we see something for the first time */
		traverseObject(value, seenObjects, duplicateObjects);
	    }
	}
    });

    /* returns:
       duplicateObjects, a list of all the objects which appear more than once */
    return duplicateObjects;
}


function encode(x) {
    let duplicateObjects = traverseObject(x, [], []);
    duplicateObjects.forEach((y) => {
	replace_with_pointers(y, duplicateObjects);
    });
    return {
	duplicateObjects: duplicateObjects,
	refTree: replace_with_pointers(x, duplicateObjects)
    }
}

function replace_with_pointers(x, duplicateObjects) {
    
    let keys = Object.keys(x);
    keys.forEach(function(key) {
	if (typeof x[key] == "object") {
	    let idx = duplicateObjects.indexOf(x[key]);
	    if (idx != -1) {
		x[key] = POINTER_PREFIX + idx;
	    }
	    else {
		/* RECURSION */
		replace_with_pointers(x[key], duplicateObjects);
	    }
	}
    });
    return x;
}


function decode(object) {
    let duplicateObjects = object.duplicateObjects;
    let refTree = object.refTree;
    let seenObjects = [];
    duplicateObjects.forEach(function(dupe) {
	decode_walk(dupe, seenObjects, duplicateObjects);
    });

    return decode_walk(refTree, seenObjects, duplicateObjects);
}

function decode_walk(x, seenObjects, duplicateObjects) {
    let keys = Object.keys(x);
    seenObjects.push(x);
    
    keys.forEach(function(key) {
	if (typeof x[key] == "string" && x[key].indexOf(POINTER_PREFIX)==0) {
	    /* replace */
	    let pointerIdx = Number(x[key].slice(POINTER_PREFIX.length));
	    
	    x[key] = duplicateObjects[pointerIdx];
	}
	else if (typeof x[key] == "object" && seenObjects.indexOf(x[key])==-1) {
	    /* recur */
	    decode_walk(x[key], seenObjects, duplicateObjects);
	}
    });

    return x;
}

module.exports = {
    traverseObject: traverseObject,
    encode: encode,
    decode: decode
}
