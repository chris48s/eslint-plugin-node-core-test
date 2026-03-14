# node-core-test/no-incomplete-tests

📝 Disallow incomplete/TODO tests.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

`node:test` has a feature that allows you to temporarily mark tests as incomplete, pending an implementation. This feature is often helpful while code is work in progress. Before committing changes we may want to check that no tests are marked as incomplete.

This rule allows you to raise ESLint warnings or errors on incomplete tests.

## Rule Details

There are a number of ways to make a test as incomplete:

- Appending `.todo` to the test suite or case
- Passing `todo` in the test options
- Calling `todo()` inside the test body

Examples of **incorrect** code for this rule:

```js
describe.todo("foo", function () {});
it.todo("foo", function () {});
describe["todo"]("bar", function () {});
it["todo"]("bar", function () {});

suite.todo("foo", function () {});
suite["todo"]("bar", function () {});

test.todo("foo", function () {});
test["todo"]("bar", function () {});
test("foo", { todo: true }, function () {});
test("foo", { todo: "remember to implement this" }, function () {});
test("foo", function (t) {
  // code
  t.todo();
});
test("foo", function (t) {
  // code
  t.todo("remember to implement this");
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

## Further Reading

https://nodejs.org/api/test.html#todo-tests
