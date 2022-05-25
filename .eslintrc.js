const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
    jest: true
  },
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:react-native/all',
    'plugin:prettier/recommended', // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'react',
    'react-hooks',
    'react-native',
    '@react-native-community',
    'prettier',
    'jest',
    'import'
  ],
  settings: {
    'import/ignore': ['react-native'],
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@assets-font': './Src/Assets/Font',
          '@assets-icon': './Src/Assets/Icon',
          '@assets-image': './Src/Assets/Image',
          '@assets-mockData': './Src/Assets/MockData',
          '@assets': './Src/Assets',
          '@components': './Src/Components',
          '@configs': './Src/Configs',
          '@constants': './Src/Constants',
          '@hooks-util': './Src/Hooks/HookUtil',
          '@hooks': './Src/Hooks',
          '@modules-auth': './Src/Modules/Auth',
          '@modules-home': './Src/Modules/Home',
          '@modules-setting': './Src/Modules/Setting',
          '@modules': './Src/Modules',
          '@navigators': './Src/Navigators',
          '@models-form': './Src/Models/Form',
          '@models-other': './Src/Models/Other',
          '@models-util': './Src/Models/PojoModelUtil',
          '@models-request': './Src/Models/Request',
          '@models-response': './Src/Models/Response',
          '@models-schema': './Src/Models/Schema',
          '@models': './Src/Models',
          '@stores-redux-middleware': './Src/Stores/Redux/Middleware',
          '@stores-redux': './Src/Stores/Redux',
          '@stores-saga': './Src/Stores/Saga',
          '@stores-service': './Src/Stores/Service',
          '@stores-util': './Src/Stores/StoreUtil',
          '@stores': './Src/Stores',
          '@themes': './Src/Themes',
          '@translations': './Src/Translations',
          '@utils': './Src/Utils'
        }
      }
    },
    react: {
      version: require('./package.json').dependencies.react
    }
  },
  // Map from global var to bool specifying if it can be redefined
  globals: {
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    FormData: false,
    global: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    window: false,
    XMLHttpRequest: false
  },
  overrides: [
    {
      files: ['.js', '.jsx', '.ts', '.tsx'],
      rules: {
        'prettier/prettier': [
          ERROR,
          {},
          {
            usePrettierrc: true
          }
        ],
        // General
        indent: 'off',
        // general
        'global-require': OFF,
        'no-plusplus': OFF,
        'no-cond-assign': OFF,
        'max-classes-per-file': [ERROR, 10],
        'no-shadow': OFF,
        'no-undef': OFF,
        'no-bitwise': OFF,
        'no-param-reassign': OFF,
        'no-use-before-define': OFF,
        'linebreak-style': [ERROR, 'unix'],
        semi: [ERROR, 'always'],
        'comma-dangle': [
          ERROR,
          {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'ignore'
          }
        ],
        'object-curly-spacing': [ERROR, 'always'],
        'eol-last': [ERROR, 'always'],
        'no-console': OFF,
        'no-restricted-syntax': [
          ERROR,
          {
            selector:
              "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|trace|disableYellowBox|tron)$/]",
            message: 'Unexpected property on console object was called'
          }
        ],
        eqeqeq: [ERROR, 'always'],
        quotes: [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        // typescript
        '@typescript-eslint/no-shadow': [ERROR],
        '@typescript-eslint/no-use-before-define': [ERROR],
        '@typescript-eslint/no-unused-vars': ERROR,
        '@typescript-eslint/indent': [
          ERROR,
          2,
          {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
              parameters: 1,
              body: 1
            },
            FunctionExpression: {
              parameters: 1,
              body: 1
            }
          }
        ],
        // imports
        'import/extensions': OFF,
        'import/prefer-default-export': OFF,
        'import/no-cycle': OFF,
        'import/order': [
          ERROR,
          {
            groups: ['builtin', 'external', 'internal', 'index', 'type', 'object', 'parent', 'sibling'],
            alphabetize: {
              order: 'asc'
            }
          }
        ],
        'import/no-unresolved': [ERROR, { commonjs: true, amd: true }],
        'import/named': ERROR,
        'import/namespace': ERROR,
        'import/default': ERROR,
        'import/export': ERROR,
        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        // react hooks
        'react-hooks/exhaustive-deps': ERROR,
        'react-hooks/rules-of-hooks': ERROR,
        // react
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/no-unescaped-entities': [ERROR, { forbid: ['>', '"', '}'] }],
        'react/prop-types': [ERROR, { ignore: ['action', 'dispatch', 'nav', 'navigation'] }],
        'react/display-name': OFF,
        'react/jsx-boolean-value': ERROR,
        'react/jsx-no-undef': ERROR,
        'react/jsx-uses-react': ERROR,
        'react/jsx-sort-props': [
          ERROR,
          {
            callbacksLast: true,
            shorthandFirst: true,
            ignoreCase: true,
            noSortAlphabetically: true
          }
        ],
        'react/jsx-pascal-case': ERROR,
        'react/no-children-prop': OFF,
        // react-native specific rules
        'react-native/no-unused-styles': ERROR,
        'react-native/no-inline-styles': ERROR,
        'react-native/no-color-literals': ERROR,
        'react-native/no-raw-text': ERROR
      }
    }
  ]
};
