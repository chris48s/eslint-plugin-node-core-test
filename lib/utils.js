/**
 * @fileoverview Shared utilities for eslint-plugin-nodetest rules
 * @author chris48s
 */
"use strict";

/**
 * Returns the base identifier name for a call expression's callee.
 *
 * Walks the MemberExpression `.object` chain until it reaches an Identifier,
 * so that calls like `describe(...)`, `describe.only(...)`, and even deeper
 * chains like `describe.skip.only(...)` all return `"describe"`.
 *
 * @param {import('eslint').Rule.Node} node - A CallExpression node
 * @returns {string|null}
 */
function getCalleeName(node) {
  if (!node.callee) return null;

  let callee = node.callee;

  // Walk the object chain until we reach an Identifier
  while (callee.type === "MemberExpression") {
    callee = callee.object;
  }

  if (callee.type === "Identifier") {
    return callee.name;
  }

  return null;
}

module.exports = { getCalleeName };
