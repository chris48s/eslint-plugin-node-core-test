/**
 * @file Disallow empty tests
 * @author chris48s
 */

import { SUITE_AND_TEST_FUNCTIONS, getCalleeName } from "../utils.js";

function isTestFunctionCall(node) {
  return (
    node.type === "CallExpression" &&
    SUITE_AND_TEST_FUNCTIONS.has(getCalleeName(node))
  );
}

function isMissingCallback(node) {
  const args = node.arguments;
  // If there is an inline function/arrow function argument, we have a callback.
  if (
    args.some(
      (arg) =>
        arg.type === "FunctionExpression" ||
        arg.type === "ArrowFunctionExpression",
    )
  ) {
    return false;
  }
  // No inline callback. If there are no arguments, the callback is missing.
  if (args.length === 0) {
    return true;
  }
  // Treat a non-options last argument as a callback (e.g., Identifier/MemberExpression).
  const lastArg = args[args.length - 1];
  // If the last argument is an options object, then there is no callback.
  if (lastArg.type === "ObjectExpression") {
    return true;
  }
  // Only Identifier and MemberExpression can be callback references passed by name.
  if (lastArg.type === "Identifier" || lastArg.type === "MemberExpression") {
    return false;
  }
  // Anything else (e.g., a string literal) is not a callback.
  return true;
}

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow empty tests",
      recommended: true,
      url: "https://github.com/chris48s/eslint-plugin-node-core-test/blob/main/docs/rules/no-empty-tests.md",
    },
    fixable: null,
    schema: [],
    messages: {
      noEmptyTests: "Unexpected empty test.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (isTestFunctionCall(node) && isMissingCallback(node)) {
          context.report({ node, messageId: "noEmptyTests" });
        }
      },
    };
  },
};
