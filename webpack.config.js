var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var CSS_PATH = path.resolve(ROOT_PATH, 'src/css');
var JS_PATH = path.resolve(ROOT_PATH, 'src/js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: JS_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //CSS及style相关module
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer', 'sass'],
        include: CSS_PATH
      },
      {
        test:/\.(png|jpg|jpeg)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {presets:['es2015','react']},
        exclude: /node_modules/
      }

      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   query: {presets: ['es2015']},
      //   exclude: /node_modules/
      // }
    ]
  },
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.js')
    extensions: ['', '.js','.jsx', '.json']
  },
  //localhost使用
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  // 添加此插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      //favicon:'./src/img/favicon.ico', favicon路径
      filename:'index.html',    //生成的html存放路径，相对于 path
      template:'src/index.html',    //html模板路径
      inject:true,    //允许插件修改哪些内容，包括head与body
      hash:true,    //为静态资源生成hash值
      minify:{    //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:false    //删除空白符与换行符
      }
    })
  ]
};
