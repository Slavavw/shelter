const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


console.log(path.join(__dirname,'/src','index.html'));
let mode = 'development';
if (process.env.NODE_ENV === 'production') mode = 'production';

console.log(mode);

module.exports = {
 mode: mode,
 devtool:'source-map', //для инспектирования в браузере чтобы отоброжался откуда берутся наши стили с какого файла тянутся
 entry: './main/index.js',
 output: {
  filename: "[name].[contenthash].js",
  assetModuleFilename: 'assets/[hash][ext][query]', //модуль ресурсов куда будут скидываться файлы рксурсов img etc..
  clean: true, //указываем чтобы папка dist очищалась каждый раз при сборке
},
 plugins:[
  new MiniCssExtractPlugin({filename:'[name].[contenthash].css'}),
  new htmlWebpackPlugin({filename:'index.html',template:'./main/index.html'}),
  new CleanWebpackPlugin(),
 ],
 module:{
  rules: [
   { 
     test: /\.html$/i,
     use: 'html-loader', //обработки изображений в файлах html
   },
   {
    test: /\.(sa|sc|c)ss$/i,
    use:[mode==='development'?'style-loader':MiniCssExtractPlugin.loader,
    //для development  стили будут встраиваться в папку head  нашего index.html (отрабатывает style-loader)
    //для production будет создаваться файл стилей отрабатывает лоудер MiniCssExtractPlugin.loader
     'css-loader', // 
     'postcss-loader', //должно добавлять префиксы стилей под разные браузеры
     'sass-loader' //для обработки препроцессоров scss
     ]
   },   
   {
     test: /\.(img|svg|jpg|jpeg|gif|png)$/i,
     type: 'asset/resource',
   },
   {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
 ]
}
}