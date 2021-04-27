let Random = Mock.Random;
Mock.mock("/menu", {
    // 18代表的是数组的长度
    'data|18': [{
        // 2-4 代表数组长度在2-4范围内
        'titles|3': [{
            // @cword(2,4) 代表的是随机生成2-4个汉字
            name: '@cword(2,3)',
            // 随机生成一个http的链接地址
            href: '@url(http)'
        }],
        content: {
            'tabs|2-5': [{
                name: '@cword(2,4)',
                href: '@url(http)'
            }],
            'details|8-15': [{
                category: '@cword(2,4)',
                'items|8-16': [{
                    href: '@url(http)',
                    name: '@cword(2,4)'
                }]
            }]
        }
    }]
})
Mock.mock("/getNews", {
    "data|4": [{
        newsTag: "@cword(2)",
        newsTitel: "@cword(10,16)",
        newsUrl: "@url(http)"
    }]
})
Mock.mock("/goods", {

    'data|100': [{

        img: ["@image(120x120, @color, #fff, @natural)", null],
        desc: "@cword(20,30)",
        price: "@float(1,1000,2,2)"
    }]
})