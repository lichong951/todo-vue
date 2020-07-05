module.exports={
    devServer:{
        proxy:{
            '/todo':{
                target:'http://localhost:7001',
                ws:true,
                changeOrgin:true
            },
            // '/article':{
            //     target:'http://localhost:7001',
            //     ws:true,
            //     changeOrgin:true
            // },
            
        }
    }
};