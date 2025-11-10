module.exports = function (api) {
  api.cache(true);

  // Set EXPO_ROUTER_APP_ROOT before babel-preset-expo processes it
  // babel-preset-expo will handle the transformation automatically
  if (!process.env.EXPO_ROUTER_APP_ROOT) {
    process.env.EXPO_ROUTER_APP_ROOT = './app';
  }

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [['babel-plugin-inline-dotenv', { path: '.env' }], 'react-native-reanimated/plugin'],
  };
};
