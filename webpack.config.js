const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
   entry: "./js/index.ts",
   mode: isProduction ? "production" : "development",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
         },
         { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
         },
         {
            test: /\.(woff|woff2|eat|ttf|otf)$/i,
            type: "asset/resource",
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env"],
               },
            },
         },
      ],
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{ from: "static", to: "static" }],
      }),
      new HtmlWebpackPlugin({
         template: "./index.html",
      }),
      new MiniCssExtractPlugin(),
   ],
   optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
   },
   devtool: isProduction ? "hidden-source-map" : "source-map",
};
