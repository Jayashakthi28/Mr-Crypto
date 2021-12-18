const path=require("path");
const common=require('./webpack.common');
const {merge}=require("webpack-merge");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
module.exports=merge(common,{
    mode:'production',
    plugins:[new CleanWebpackPlugin()],
    output:{
        filename:"[name].[hash].js",
        path:path.resolve(__dirname,"dist"),
        assetModuleFilename: "assets/[name][ext][query]"
    }
});