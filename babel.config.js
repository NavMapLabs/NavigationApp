module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Use only the Expo preset
  };
};
