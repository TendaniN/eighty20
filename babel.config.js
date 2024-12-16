module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true,
          },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    env: {
      test: {
        plugins: [
          "require-context-hook"
        ],
      },
    },
  };
  