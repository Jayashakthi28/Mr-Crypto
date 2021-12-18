const path=require("path");
const htmlPlugin=require("html-webpack-plugin");
const common=require('./webpack.common');
const {merge}=require("webpack-merge");
module.exports=merge(common,{
    mode:'development',
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"dist/js")
    }
});