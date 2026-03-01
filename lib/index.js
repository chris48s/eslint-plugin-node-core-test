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
    plugins: { nodetest: plugin },
    rules: {
      "nodetest/consistent-spacing-between-blocks": "error",
      "nodetest/no-empty-title": "error",
      "nodetest/no-identical-title": "error",
      "nodetest/no-sibling-hooks": "error",
    },
  },
};

plugin.configs = configs;

export default plugin;
