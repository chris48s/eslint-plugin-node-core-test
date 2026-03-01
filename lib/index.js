/**
 * @file ESLint rules for node:test
 * @author chris48s
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import consistentSpacingBetweenBlocks from "./rules/consistent-spacing-between-blocks.js";
import noEmptyTitle from "./rules/no-empty-title.js";
import noIdenticalTitle from "./rules/no-identical-title.js";
import noSiblingHooks from "./rules/no-sibling-hooks.js";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

export const rules = {
  "consistent-spacing-between-blocks": consistentSpacingBetweenBlocks,
  "no-empty-title": noEmptyTitle,
  "no-identical-title": noIdenticalTitle,
  "no-sibling-hooks": noSiblingHooks,
};

const plugin = { rules };

export const configs = {
  recommended: {
    plugins: { "node-core-test": plugin },
    rules: {
      "node-core-test/consistent-spacing-between-blocks": "error",
      "node-core-test/no-empty-title": "error",
      "node-core-test/no-identical-title": "error",
      "node-core-test/no-sibling-hooks": "error",
    },
  },
};

plugin.configs = configs;

export default plugin;
