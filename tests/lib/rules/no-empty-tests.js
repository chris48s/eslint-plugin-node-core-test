/**
 * @file Disallow empty tests
 * @author chris48s
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-empty-tests.js";
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

const error = { messageId: "noEmptyTests" };

ruleTester.run("no-empty-tests", rule, {
  valid: [
    // Has a callback — not empty
    "describe('foo', function () {})",
    "it('foo', function () {})",
    "suite('foo', function () {})",
    "test('foo', function () {})",

    // .only and .skip variants with callbacks — not empty
    "describe.only('foo', function () {})",
    "it.only('foo', function () {})",
    "suite.only('foo', function () {})",
    "test.only('foo', function () {})",
    "describe.skip('foo', function () {})",
    "it.skip('foo', function () {})",
    "suite.skip('foo', function () {})",
    "test.skip('foo', function () {})",

    // Arrow function callback — not empty
    "test('foo', () => {})",
    "it('foo', () => {})",

    // Not a recognised test function — ignored
    "notTest('foo')",
    "notTest()",
    "notTest('foo', { timeout: 1000 })",
  ],

  invalid: [
    // No arguments at all
    {
      code: "describe()",
      errors: [error],
    },
    {
      code: "it()",
      errors: [error],
    },
    {
      code: "suite()",
      errors: [error],
    },
    {
      code: "test()",
      errors: [error],
    },

    // Missing callback — string title only
    {
      code: "describe('foo')",
      errors: [error],
    },
    {
      code: "it('foo')",
      errors: [error],
    },
    {
      code: "suite('foo')",
      errors: [error],
    },
    {
      code: "test('foo')",
      errors: [error],
    },

    // Missing callback — options object but no function
    {
      code: "describe('foo', { timeout: 1000 })",
      errors: [error],
    },
    {
      code: "it('foo', { timeout: 1000 })",
      errors: [error],
    },
    {
      code: "suite('foo', { timeout: 1000 })",
      errors: [error],
    },
    {
      code: "test('foo', { timeout: 1000 })",
      errors: [error],
    },

    // .only variants — also empty without a callback
    {
      code: "describe.only('foo')",
      errors: [error],
    },
    {
      code: "it.only('foo')",
      errors: [error],
    },
    {
      code: "suite.only('foo')",
      errors: [error],
    },
    {
      code: "test.only('foo')",
      errors: [error],
    },

    // .skip variants — also empty without a callback
    {
      code: "describe.skip('foo')",
      errors: [error],
    },
    {
      code: "it.skip('foo')",
      errors: [error],
    },
    {
      code: "suite.skip('foo')",
      errors: [error],
    },
    {
      code: "test.skip('foo')",
      errors: [error],
    },

    // Template literal title — also empty
    {
      code: "test(`foo`)",
      errors: [error],
    },
    {
      code: "it(`foo`)",
      errors: [error],
    },
  ],
});
