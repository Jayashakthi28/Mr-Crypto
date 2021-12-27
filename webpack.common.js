const path=require("path");
const htmlPlugin=require("html-webpack-plugin");
const cssLoaderPlugin=require("mini-css-extract-plugin");
module.exports={
    entry:{
        home:"./src/js/home-page.js",
        second:'./src/js/second-page.js'
    },
    plugins:[
        new htmlPlugin({
            template:'./src/html/index.html',
            chunks:['home'],
            filename:'index.html'
        }),
        new htmlPlugin({
            template:'./src/html/second.html',
            chunks:['second'],
            filename:'second.html'
        }),
        new cssLoaderPlugin({
            filename:"[name].[hash].css"
        })],
    module:{
        rules:[
            {
                test:/\.html$/,
                use:[
                    "html-loader"
                ]
            },
            {
                test:/\.css$/,
                use:[
                    cssLoaderPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.(svg|png|jpg|jpeg|gif|ttf)$/,
                type:"asset/resource",
                generator:{
                    filename:'assets/[name][ext]'
                }
            }
        ]
    }
};