# node-core-test/no-exclusive-tests

📝 Disallow exclusive tests.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

`node:test` has a feature that allows you to temporarily mark tests as exclusive. This feature is often helpful while debugging. Before committing changes we may want to check that all tests are running.

This rule allows you to raise ESLint warnings or errors on exclusive tests.

## Rule Details

There are two ways to mark tests as exclusive:

- Appending `.only` to the test suite or case
- Passing `only` in the test options

Examples of **incorrect** code for this rule:

```js
describe.only("foo", function () {});
it.only("foo", function () {});
describe["only"]("bar", function () {});
it["only"]("bar", function () {});

suite.only("foo", function () {});
suite["only"]("bar", function () {});

test.only("foo", function () {});
test["only"]("bar", function () {});
test("foo", { only: true }, function () {});
test("foo", { only: "don't run anything else" }, function () {});
```

Examples of **correct** code for this rule:

```js
describe("foo", function () {});
it("foo", function () {});
describe.skip("bar", function () {});
it.skip("bar", function () {});

suite("foo", function () {});
suite.skip("bar", function () {});

test("foo", function () {});
test.skip("bar", function () {});
```

## Further Reading

https://nodejs.org/api/test.html#only-tests
