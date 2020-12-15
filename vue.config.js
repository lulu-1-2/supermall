module.exports  = {
    configureWebpack:{
        resolve:{
            alias:{
                // '@':'src',默认新建项目的时候已经创建
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}