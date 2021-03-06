module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: ['ENV'],
        allowlist: ['SENTRY_URL', 'SEGMENT_KEY', 'API_URL', 'ENVIRONMENT'],
        safe: true,
        allowUndefined: false
      }
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
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
          '@modules-launch': './Src/Modules/Launch',
          '@modules': './Src/Modules',
          '@navigators': './Src/Navigators',
          '@models-form': './Src/Models/Form',
          '@models-other': './Src/Models/Other',
          '@models-util': './Src/Models/ModelUtil',
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
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ]
  ],
  env: {
    development: {},
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
