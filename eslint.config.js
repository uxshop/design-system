import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import prettierSkipFormattingConfig from '@vue/eslint-config-prettier/skip-formatting';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const globalFiles = ['**/*.{vue,js,mjs,cjs,ts}'];

export default [
  {
    ignores: ['**/*.{config,old_doc}.{js,mjs,cjs,ts}', '**/redactor/', 'coverage'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ...eslint.configs.recommended,
    files: globalFiles,
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: globalFiles,
  })),
  {
    files: ['**/*.{vue,js,mjs,cjs,ts}'],
    name: 'ds/typescript',
    rules: {
      eqeqeq: 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'typeProperty', //Verificar
          format: null,
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z]$',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: null,
          custom: {
            regex: `^['"]?[A-Z]+([-_][A-Z]+)*['"]?$`,
            match: true,
          },
        },
        {
          selector: 'objectLiteralProperty', //Verificar
          format: null,
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-useless-concat': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/array-type': 'error', // Enforce using `T[]` instead of `Array<T>`
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    plugins: {
      vitest,
    },
    name: 'ds/vitest',
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-filename': 'error',
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/valid-title': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  ...pluginVue.configs['flat/recommended'],
  prettierSkipFormattingConfig,
  {
    files: ['**/*.vue'],
    name: 'ds/vue',
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      // Rules imported from @vue/eslint-config-typescript due to unsupported flat config
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      // End imported rules
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/multi-word-component-names': 'off', // Desabilitada devido ao padrão do DS em que os componentes ao serem usados em outros projetos podem conter um nome composto
      'vue/block-tag-newline': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unused-emit-declarations': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/padding-line-between-blocks': ['error', 'always'],
    },
  },
  {
    files: ['**/*.stories.ts'],
    name: 'ds/docs',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
