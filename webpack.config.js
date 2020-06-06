// where the entry point is -> output
const path = require('path');
//this is node function(google for info)


module.exports = {
    entry: './src/app.js',
    output:{
        path: path.join(__dirname, 'public'),
        filename:'bundle.js',  //bundle.js is just a common name used, it can be anything doesnt matter
    },
    module:{
        rules:[{
            loader:'babel-loader',
            test:/\.js$/,
            exclude:/node_modules/,
        },
        {
            test:/\.s?css$/,
            use:[
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
    ]
        
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback:true //this tells the server to send index.html file for all 404 pages
    }
    //source map -- Helps in debugging, great for development.(check console to know the difference)
};

// loader - a loader lets you customize the behaviour of a particular webpack when it gets loaded
