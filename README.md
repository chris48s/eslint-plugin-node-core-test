# eslint-plugin-node-core-test

ESLint rules for `node:test`

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-node-core-test`:

```sh
npm install eslint-plugin-node-core-test --save-dev
```

## Usage

```js
import nodeCoreTestPlugin from "eslint-plugin-node-core-test";

export default [
    // This plugin exports a recommended config
    nodeCoreTestPlugin.configs.recommended,

    {
        // Add node-core-test to the plugins declaration
        plugins: {
            "node-core-test": nodeCoreTestPlugin
        },

        // Optionally customise or configure rules
        rules: {
            "node-core-test/no-sibling-hooks": "warn"
        }
    }
];
```


## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                 | Description                                                        | 💼 | ⚠️ | 🔧 |
| :----------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :- | :- | :- |
| [consistent-spacing-between-blocks](docs/rules/consistent-spacing-between-blocks.md) | Require consistent spacing between blocks                          | ✅  |    | 🔧 |
| [no-empty-title](docs/rules/no-empty-title.md)                                       | Disallow empty test descriptions                                   | ✅  |    |    |
| [no-identical-title](docs/rules/no-identical-title.md)                               | Disallow identical titles                                          | ✅  |    |    |
| [no-sibling-hooks](docs/rules/no-sibling-hooks.md)                                   | Disallow duplicate uses of a hook at the same level inside a suite | ✅  |    |    |
| [no-skipped-tests](docs/rules/no-skipped-tests.md)                                   | Disallow skipped tests                                             |    | ✅  |    |

<!-- end auto-generated rules list -->


