Mock.mock("/hotwords", {
    "data|7": [{
        "hotword": "@cword(2,4)",
        "href": "@url(http)"
    }]
})
Mock.mock('/recommendWord', {
    word: '@cword(2,5)',
    href: '@url(http)'
})