# eslint-plugin-nodetest

ESLint rules for `node:test`

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nodetest`:

```sh
npm install eslint-plugin-nodetest --save-dev
```

## Usage

```js
import nodetest from "eslint-plugin-nodetest";

export default [
    // This plugin exports a recommended config
    nodetest.configs.recommended,

    {
        // Add nodetest to the plugins declaration
        plugins: {
            nodetest
        },

        // Optionally customise or configure rules
        rules: {
            "nodetest/no-sibling-hooks": "warn"
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
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                 | Description                                                        | 💼 | 🔧 |
| :----------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :- | :- |
| [consistent-spacing-between-blocks](docs/rules/consistent-spacing-between-blocks.md) | Require consistent spacing between blocks                          | ✅  | 🔧 |
| [no-empty-title](docs/rules/no-empty-title.md)                                       | Disallow empty test descriptions                                   | ✅  |    |
| [no-identical-title](docs/rules/no-identical-title.md)                               | Disallow identical titles                                          | ✅  |    |
| [no-sibling-hooks](docs/rules/no-sibling-hooks.md)                                   | Disallow duplicate uses of a hook at the same level inside a suite | ✅  |    |

<!-- end auto-generated rules list -->


