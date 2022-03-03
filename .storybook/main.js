module.exports = {
  "stories": [
    "../src/**/*.stories.mdx", 
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)", 
    "../src/components/ui/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
    "@storybook/addon-postcss"
  ],
  "framework": "@storybook/vue3"
}
