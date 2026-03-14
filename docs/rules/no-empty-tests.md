# node-core-test/no-empty-tests

📝 Disallow empty tests.

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

This rule requires you to provide a test function for every test or suite.

## Rule Details

This rule looks for `node:test` function calls that do not pass a test function as an argument.

Examples of **incorrect** code for this rule:

```js
describe();
suite();
it();
test();

describe("foo");
suite("foo");
it("foo");
test("foo");

describe("foo", { timeout: 1000 });
suite("foo", { timeout: 1000 });
it("foo", { timeout: 1000 });
test("foo", { timeout: 1000 });
```

Examples of **correct** code for this rule:

```js
describe("foo", function () {});

suite("foo", function () {});

it("foo", function () {});

test("foo", function () {});
```
