// 导入
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname,dir);


module.exports = {
    mode:'development',
    // 单入口写法
    //entry: './src/index.js',
    // 多入口写法
    entry: {
        index:'./src/index.js',
        //search:'./src/search.js',
        list:'./src/list.js'
    },

    // 多入口输出
    output: {
        // __dirname参数指代文件的绝对路径和dist拼接起来
        path:resolve('dist'),
        // 输出的名字
        filename: 'js/[name].js',
    },
    // source-map 调试用的，出错的时候直接定位到原始代码，而不是转换后的代码
    devtool:'cheap-module-eval-source-map',

    // 不同模块的处理规则
    module:{
        rules:[
            {
                // 作用范围正则表达式
                test:/\.art$/,
                // 排出的文件
                loader:'art-template-loader'
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            // 将打包好的html文件放入模板
            template:'./src/index.art',
            filename:'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            // 将打包好的html文件放入模板
            template:'./src/list.art',
            filename:'list.html',
            chunks:['list']
        }),
    ],
};