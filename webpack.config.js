const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "snackpack.js",
    // clean:true
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.ts$/,

        use: "ts-loader",

        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          //从下到上使用
          "style-loader",
          "css-loader",
          //引入postcss
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env",
        //           {
        //             browsers: "last 2 versions"
        //           },
        //         ],
        //       },
        //     },
        //   },
          "less-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "SNACK",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts",".less"],
  },
};
