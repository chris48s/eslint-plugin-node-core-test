# node-core-test/no-skipped-tests

📝 Disallow skipped tests.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

`node:test` has a feature that allows you to temporarily mark tests as skipped. This feature is often helpful while debugging.. Before committing changes we may want to check that all tests are running.

This rule allows you to raise ESLint warnings or errors on skipped tests.

## Rule Details

There are a number of ways to disable tests:

- Appending `.skip` to the test suite or case
- Passing `skip` in the test options
- Calling `skip()` inside the test body

Examples of **incorrect** code for this rule:

```js
describe.skip("foo", function () {});
it.skip("foo", function () {});
describe["skip"]("bar", function () {});
it["skip"]("bar", function () {});

suite.skip("foo", function () {});
suite["skip"]("bar", function () {});

test.skip("foo", function () {});
test["skip"]("bar", function () {});
test("foo", { skip: true }, function () {});
test("foo", { skip: "this is skipped" }, function () {});
test("foo", function (t) {
  // code
  t.skip();
});
test("foo", function (t) {
  // code
  t.skip("this is skipped");
});
```

Examples of **correct** code for this rule:

```js
describe("foo", function () {});
it("foo", function () {});
describe.only("bar", function () {});
it.only("bar", function () {});

suite("foo", function () {});
suite.only("bar", function () {});

test("foo", function () {});
test.only("bar", function () {});
```

## When Not To Use It

If the existence of pending/unimplemented tests isn't considered important enough to warrant raising lint warnings/errors.

## Further Reading

https://nodejs.org/api/test.html#skipping-tests
