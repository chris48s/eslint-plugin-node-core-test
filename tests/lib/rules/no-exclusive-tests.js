/**
 * @file Disallow exclusive tests
 * @author chris48s
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-exclusive-tests.js";
import { RuleTester } from "eslint";
import { describe, it } from "node:test";

RuleTester.describe = describe;
RuleTester.it = it;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2020, sourceType: "script" },
});

const error = { messageId: "noExclusiveTests" };

ruleTester.run("no-exclusive-tests", rule, {
  valid: [
    // Plain calls — not exclusive
    "describe('foo', function () {})",
    "it('foo', function () {})",
    "suite('foo', function () {})",
    "test('foo', function () {})",

    // .skip variants — not exclusive
    "describe.skip('foo', function () {})",
    "it.skip('foo', function () {})",
    "suite.skip('foo', function () {})",
    "test.skip('foo', function () {})",

    // Options object without only
    "test('foo', {}, function () {})",
    "test('foo', { timeout: 1000 }, function () {})",

    // only: false — explicitly not exclusive
    "test('foo', { only: false }, function () {})",

    // Not a recognised test function — ignored
    "notTest.only('foo', function () {})",
    "notTest('foo', { only: true }, function () {})",

    // Dynamic only value — cannot be statically analysed, so allowed
    "test('foo', { only: isOnly }, function () {})",
    "test('foo', { only: getOnly() }, function () {})",
  ],

  invalid: [
    // .only method — dot notation
    {
      code: "describe.only('foo', function () {})",
      errors: [error],
    },
    {
      code: "it.only('foo', function () {})",
      errors: [error],
    },
    {
      code: "suite.only('foo', function () {})",
      errors: [error],
    },
    {
      code: "test.only('foo', function () {})",
      errors: [error],
    },

    // .only method — bracket notation
    {
      code: "describe['only']('bar', function () {})",
      errors: [error],
    },
    {
      code: "it['only']('bar', function () {})",
      errors: [error],
    },
    {
      code: "suite['only']('bar', function () {})",
      errors: [error],
    },
    {
      code: "test['only']('bar', function () {})",
      errors: [error],
    },

    // only option: true
    {
      code: "test('foo', { only: true }, function () {})",
      errors: [error],
    },
    {
      code: "it('foo', { only: true }, function () {})",
      errors: [error],
    },

    // only option: non-empty string
    {
      code: "test('foo', { only: \"don't run anything else\" }, function () {})",
      errors: [error],
    },
    {
      code: "it('foo', { only: \"don't run anything else\" }, function () {})",
      errors: [error],
    },
  ],
});
