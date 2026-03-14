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
  return !node.arguments.some(
    (arg) =>
      arg.type === "FunctionExpression" ||
      arg.type === "ArrowFunctionExpression",
  );
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
