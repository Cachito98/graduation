let ipUrl=""

let servicePath = {
    getArticleList:ipUrl+'getArticleList', //首页接口
    getArticleById:ipUrl+'getArticleById/',  //详情页接口
    getTypeInfo:ipUrl+'getTypeInfo',  //头部(文章类别)接口
    getListById:ipUrl + 'getListById/',         // 根据类别ID获得文章列表 
}

export default servicePath