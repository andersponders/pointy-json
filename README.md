# pointy-json
JSON schema w/ encoder/decoder allowing circular references and preserving object references


## usage

```
var x = {y: null};
var y = {x: x};
x.y = y;

let encoded = pointy_json.encode({
  x: x,
  y: y
});
```

{x: x, y: y} gets represented as {x: "__pointer@@@0", y: "__pointer@@@1"}, which you can safely JSON.stringify and transfer

then, on the other end:

```

let decoded = pointy_json.decode(stringified_pointy_json_result_from_your_api_call_or_whatever);

/* decoded is {
  x: {y: ....}
  y: {x: ....}
} */
```
