/**
 * @fileoverview Require consistent spacing between blocks
 * @author chris48s
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const TEST_FUNCTIONS = new Set([
  "describe",
  "suite",
  "it",
  "test",
  "before",
  "after",
  "beforeEach",
  "afterEach",
]);

const SUITE_FUNCTIONS = new Set(["describe", "suite"]);

const MINIMUM_LINES_BETWEEN = 2;

function getCalleeName(node) {
  if (node.callee && node.callee.type === "Identifier") {
    return node.callee.name;
  }
  return null;
}

function isSuiteFunctionCall(node) {
  return (
    node.type === "CallExpression" && SUITE_FUNCTIONS.has(getCalleeName(node))
  );
}

function isSuiteCallbackFunction(node) {
  const parent = node.parent;
  if (!parent || parent.type !== "CallExpression") {
    return false;
  }
  if (!isSuiteFunctionCall(parent)) {
    return false;
  }
  return parent.arguments.includes(node);
}

function containsNode(container, node) {
  return (
    node.range[0] >= container.range[0] && node.range[1] <= container.range[1]
  );
}

function isFirstStatementInScope(scopeNode, node) {
  const body = scopeNode.body;
  if (!body || body.length === 0) {
    return true;
  }
  const firstStatement = body[0];
  return containsNode(firstStatement, node);
}

function getNodeForTokenCheck(node) {
  // Walk up the parent chain while the parent is a MemberExpression, so that
  // chained calls like it('foo', fn).timeout(42) are treated as one unit.
  if (node.parent && node.parent.type === "MemberExpression") {
    return getNodeForTokenCheck(node.parent);
  }
  return node;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require consistent spacing between blocks",
      recommended: false,
      url: "https://github.com/chris48s/eslint-plugin-nodetest/blob/main/docs/rules/consistent-spacing-between-blocks.md",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      missingLineBreak: "Expected line break before this statement.",
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;

    // Stack of layers. Each layer tracks the entities (test function calls)
    // inside a given scope (Program body or suite callback body).
    const layers = [];

    function addEntityToCurrentLayer(node) {
      if (layers.length > 0) {
        layers[layers.length - 1].entities.push(node);
      }
    }

    function checkCurrentLayer() {
      const currentLayer = layers[layers.length - 1];

      for (const entity of currentLayer.entities) {
        const nodeForCheck = getNodeForTokenCheck(entity);
        const beforeToken = sourceCode.getTokenBefore(nodeForCheck);

        if (
          !isFirstStatementInScope(currentLayer.scopeNode, nodeForCheck) &&
          beforeToken !== null
        ) {
          const linesBetween =
            (nodeForCheck.loc.start.line) - (beforeToken.loc.end.line);

          if (linesBetween < MINIMUM_LINES_BETWEEN) {
            context.report({
              node: entity,
              messageId: "missingLineBreak",
              fix(fixer) {
                return fixer.insertTextAfter(
                  beforeToken,
                  linesBetween === 0 ? "\n\n" : "\n"
                );
              },
            });
          }
        }
      }
    }

    function enterSuiteCallback(node) {
      layers.push({ entities: [], scopeNode: node.body });
    }

    function exitSuiteCallback() {
      checkCurrentLayer();
      layers.pop();
    }

    return {
      Program(node) {
        layers.push({ entities: [], scopeNode: node });
      },

      "Program:exit"() {
        checkCurrentLayer();
        layers.pop();
      },

      FunctionExpression(node) {
        if (isSuiteCallbackFunction(node)) {
          enterSuiteCallback(node);
        }
      },

      "FunctionExpression:exit"(node) {
        if (isSuiteCallbackFunction(node)) {
          exitSuiteCallback();
        }
      },

      ArrowFunctionExpression(node) {
        if (isSuiteCallbackFunction(node)) {
          enterSuiteCallback(node);
        }
      },

      "ArrowFunctionExpression:exit"(node) {
        if (isSuiteCallbackFunction(node)) {
          exitSuiteCallback();
        }
      },

      CallExpression(node) {
        const name = getCalleeName(node);
        if (TEST_FUNCTIONS.has(name)) {
          addEntityToCurrentLayer(node);
        }
      },
    };
  },
};
