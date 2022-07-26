// 导入
const path = require('path');


// 导出
module.exports = {
    mode:'development',
    // 单入口写法
    //entry: './src/index.js',
    // 多入口写法
    entry: {
        main:'./src/index.js',
        search:'./src/search.js',
    },

    // 单入口输出
    // path一定得是绝对路径
    // output: {
    //     // __dirname参数指代文件的绝对路径和dist拼接起来
    //     path:path.resolve(__dirname,'dist'),
    //     // 输出的名字
    //     filename: 'bundle.js',
    // },


    // 多入口输出
    output: {
        // __dirname参数指代文件的绝对路径和dist拼接起来
        path:path.resolve(__dirname,'dist'),
        // 输出的名字
        filename: '[name].js',
    },
};