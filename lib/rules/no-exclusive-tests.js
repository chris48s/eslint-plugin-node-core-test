/**
 * @file Disallow exclusive tests
 * @author chris48s
 */

import { isTestMethodCall, hasTruthyTestOption } from "../utils.js";

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow exclusive tests",
      recommended: true,
      url: "https://github.com/chris48s/eslint-plugin-node-core-test/blob/main/docs/rules/no-exclusive-tests.md",
    },
    fixable: null,
    schema: [],
    messages: {
      noExclusiveTests: "Unexpected exclusive test.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          isTestMethodCall(node, "only") ||
          hasTruthyTestOption(node, "only")
        ) {
          context.report({ node, messageId: "noExclusiveTests" });
        }
      },
    };
  },
};
