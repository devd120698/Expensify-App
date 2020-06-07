// where the entry point is -> output
const path = require('path');
//this is node function(google for info)

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env)=>{
    const isProduction = env === 'production'
    const CSSExtract = new ExtractTextPlugin('styles.css');
    
    return {
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
                use:CSSExtract.extract({
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                sourceMap:true
                            }
                        },
                        {
                            loader:'sass-loader',
                            options:{
                                sourceMap:true
                            }
                        } 
                    ]
                })
            }
        ]
            
        },
        plugins: [
            CSSExtract
        ] ,
        devtool: isProduction?'source-map':'inline-source-map',
        devServer:{
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback:true //this tells the server to send index.html file for all 404 pages
        }
        //source map -- Helps in debugging, great for development.(check console to know the difference)
    };
    
}

// loader - a loader lets you customize the behaviour of a particular webpack when it gets loaded
