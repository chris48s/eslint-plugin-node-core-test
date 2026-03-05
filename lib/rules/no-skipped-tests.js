/**
 * @file Disallow skipped tests
 * @author chris48s
 */

import {
  isTestMethodCall,
  hasTruthyTestOption,
  createContextMethodTracker,
} from "../utils.js";

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow skipped tests",
      recommended: true,
      url: "https://github.com/chris48s/eslint-plugin-node-core-test/blob/main/docs/rules/no-skipped-tests.md",
    },
    fixable: null,
    schema: [],
    messages: {
      noSkippedTests: "Unexpected skipped test.",
    },
  },

  create(context) {
    const { pushContextParam, popContextParam, isContextMethodCall } =
      createContextMethodTracker("skip");

    return {
      FunctionExpression: pushContextParam,
      "FunctionExpression:exit": popContextParam,
      ArrowFunctionExpression: pushContextParam,
      "ArrowFunctionExpression:exit": popContextParam,

      CallExpression(node) {
        if (
          isTestMethodCall(node, "skip") ||
          hasTruthyTestOption(node, "skip") ||
          isContextMethodCall(node)
        ) {
          context.report({ node, messageId: "noSkippedTests" });
        }
      },
    };
  },
};
