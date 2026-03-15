/**
 * @file Disallow incomplete/TODO tests
 * @author chris48s
 */

import {
  isTestMethodCall,
  hasTruthyTestOption,
  createContextMethodTracker,
  SUITE_AND_TEST_FUNCTIONS,
  collectSuiteCallbackIdentifiers,
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
    const callbackIdentifiers = new Set();
    const { pushContextParam, popContextParam, isContextMethodCall } =
      createContextMethodTracker("todo", { callbackIdentifiers });

    return {
      Program(node) {
        for (const id of collectSuiteCallbackIdentifiers(
          node,
          SUITE_AND_TEST_FUNCTIONS,
        )) {
          callbackIdentifiers.add(id);
        }
      },

      FunctionDeclaration: pushContextParam,
      "FunctionDeclaration:exit": popContextParam,
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
