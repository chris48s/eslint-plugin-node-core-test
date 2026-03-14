/**
 * @file Disallow incomplete/TODO tests
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
      description: "Disallow incomplete/TODO tests",
      recommended: true,
      url: "https://github.com/chris48s/eslint-plugin-node-core-test/blob/main/docs/rules/no-incomplete-tests.md",
    },
    fixable: null,
    schema: [],
    messages: {
      noIncompleteTests: "Unexpected incomplete test.",
    },
  },

  create(context) {
    const { pushContextParam, popContextParam, isContextMethodCall } =
      createContextMethodTracker("todo");

    return {
      FunctionExpression: pushContextParam,
      "FunctionExpression:exit": popContextParam,
      ArrowFunctionExpression: pushContextParam,
      "ArrowFunctionExpression:exit": popContextParam,

      CallExpression(node) {
        if (
          isTestMethodCall(node, "todo") ||
          hasTruthyTestOption(node, "todo") ||
          isContextMethodCall(node)
        ) {
          context.report({ node, messageId: "noIncompleteTests" });
        }
      },
    };
  },
};
