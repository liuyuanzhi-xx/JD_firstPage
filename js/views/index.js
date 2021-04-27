$(function () {

    function debounce(fn, duration = 100) {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, duration);
        };
    }

    function lazyLoading(el) {
        let imgArr = [];
        const imgs = el.find(`.img`);
        console.log(typeof (imgs))
        console.log(imgs)

        imgs.each((item) => {
            console.log(item)
            // dom = item.text();
            imgArr.push({
                dom: imgs[item],
                isLoad: false
            })

        })

        function setload() {
            const maxheight = $(window).height();
            const minHeight = 120;
            imgArr.forEach(item => {
                const rect = item.dom.getBoundingClientRect()
                if (!item.isLoad && rect.top >= -minHeight && rect.top <= maxheight) {
                    const tempImg = new Image();
                    tempImg.onload = function () {
                        item.dom.src = item.dom.dataset.src;
                        console.log(item.dom.src)
                    }
                    tempImg.src = item.dom.dataset.src;
                    item.isLoad = true
                }
            })

        }
        $(window).scroll(debounce(setload));

        console.log(imgArr)

    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    function creatLocation() {
        let dd = $(".location .dd"),
            dt = $(".location .dt"),
            list_contan = $(`<div class="list_contan"></div>`),
            mainLand = $(`<div class="mianLand"></div>`),
            special = $(`<div class = "special"></div>`),
            AvailableSites = $(`<div class = "AvailableSites"></div>`),
            line = $(`<div class="line"></div>`),
            specialTitle = $(`<div class="special_Title">地区专享版本</div>`),
            AvailableSitesTitle = $(`<div class="AvailableSites_Title">Available Sites</div>`),
            loactonId = getQueryVariable("locationId") ? parseInt(getQueryVariable("locationId")) : 0;
        // console.log(loactonId);
        // console.log(dt);



        $.ajax({
            url: '/location',
            dataType: "json",
            success: function (res) {
                // console.log(res)
                res.data.mainLand.forEach(
                    function (index, key) {
                        let item = $(`<a href = 'http://127.0.0.1:5500/jd/html/views/index.html?locationId=${index.id}'><div class = "city_item item" data-id = ${key}>${index.city}</div></a>`);
                        mainLand.append(item);
                        if (index.id == loactonId) {
                            dt.text(index.city)
                            item.find(".city_item").css({
                                color: "#fff",
                                backgroundColor: "#f10215"
                            })
                        }

                    })

                special.append(specialTitle);
                res.data.special.forEach(
                    function (index, key) {
                        let item = $(`<a href = ${index.href}><div class = "special_item item" data-id = ${key}>${index.city}</div></a>`);
                        special.append(item);

                    })
                AvailableSites.append(AvailableSitesTitle);
                res.data.AvailableSites.forEach(
                    function (index, key) {
                        // console.log(index);
                        let item = $(`<a href = ${index.href}><div class = "site_item item" data-id = ${key}>${index.city}</div></a>`);
                        AvailableSites.append(item);

                    })
                list_contan.append(mainLand).append(line).append(special).append(line.clone()).append(AvailableSites);

                dd.append(list_contan)
            }
        })
    }
    $(".location").on("mouseover", function () {
        $(this).find(".dd").css({
            display: "block"
        })
    }).on("mouseout", function () {
        $(this).find(".dd").css({
            display: "none"
        })
    })

    function my_JD() {
        let dd = $(".right_nav .my_JD .dd"),
            dd_contain = $(`<div class = "dd_contain"> </div>`);
        $.ajax({
            url: "/myJD",
            dataType: 'json',
            success: function (res) {
                Object.keys(res.data).forEach(function (key, index) {
                    let list = $(`<div class = "list list_${index}"></div>`)
                    res.data[key].forEach(function (item, index) {
                        list.append($(`<a href=""><div class="item">${item.des}</div></a>`));
                    })
                    dd_contain.append(list);
                })
                dd.append(dd_contain)

            }
        })
    }

    function enterprise() {
        let dd = $(".right_nav .enterprise .dd"),
            dd_contain = $(`<div class = "dd_contain"> </div>`),
            list = $(`<div class = "list"></div>`);
        $.ajax({
            url: "/enterprise",
            dataType: 'json',
            success: function (res) {
                // console.log(res.data)
                res.data.forEach(function (item, index) {
                    list.append($(`<a href=""><div class="item">${item.des}</div></a>`));
                })
                dd_contain.append(list);
                dd.append(dd_contain)

            }
        })

    }

    function service() {
        let dd = $(".right_nav .service .dd"),
            dd_contain = $(`<div class = "dd_contain"> </div>`);
        $.ajax({
            url: "/service",
            dataType: 'json',
            success: function (res) {
                Object.keys(res.data).forEach(function (key, index) {
                    let list = $(`<div class = "list list_${index}"></div>`)
                    res.data[key].forEach(function (item, index) {
                        if (index == 0) {
                            list.append($(`<div class="title_item">${item.title}</div></a>`));
                        } else {
                            list.append($(`<a href=""><div class="item">${item.des}</div></a>`));
                        }

                    })
                    dd_contain.append(list);
                })
                dd.append(dd_contain)

            }
        })

    }

    function webSites() {
        let dd = $(".right_nav .web_nav .dd"),
            dd_contain = $(`<div class = "dd_contain"> </div>`);
        $.ajax({
            url: "/webSites",
            dataType: 'json',
            success: function (res) {
                Object.keys(res.data).forEach(function (key, index) {
                    let list = $(`<div class = "list list_${index}"></div>`)
                    res.data[key].forEach(function (item, index) {
                        if (index == 0) {
                            list.append($(`<div class="title_item">${item.title}</div></a>`));
                        } else {
                            list.append($(`<a href=""><div class="item">${item.des}</div></a>`));
                        }

                    })
                    dd_contain.append(list);
                })
                dd.append(dd_contain)

            }
        })

    }

    function JD_app() {
        let dd = $(".right_nav .app_JD .dd"),
            dd_contain = $("<div class='dd_contain'></div>");
        $.ajax({
            url: "/JD_app",
            dataType: "json",
            success: function (res) {
                res.data.forEach(function (item, index) {
                    // console.log(item, index)
                    let app_item = $(`<div class="app_item"></div>`),
                        app_qrcode = $(`<div class = "app_qrcode"><img src = ${item.QRcode}></div>`),
                        app_info = $(`<div class="app_info"></div>`),
                        item_titel = $(`<h5 class="app_titel">${item.titel}</h5>`),
                        item_value = $(`<div class="app_value">${item.value}</div>`),
                        item_a = null;
                    if (item.href) {
                        item_a = $(`<a href = ${item.href}></a>`);
                        item_a.append(item_titel);
                        app_info.append(item_a);
                    } else {
                        app_info.append(item_titel);
                    }
                    app_info.append(item_value);
                    if (item.device) {
                        let device = $(`<div class ="item_device"></div>`)
                        item.device.forEach(function (item, index) {
                            let temp = null;
                            if (item['ios']) {
                                temp = $(`<a href = ${item.ios} class = "item_ios item_apk"></a>`);
                            } else if (item['android']) {
                                temp = $(`<a href = ${item.android} class = "item_android item_apk"></a>`);
                            } else if (item['ipad']) {
                                temp = $(`<a href = ${item.ipad} class = "item_ipad item_apk"></a>`);

                            }
                            device.append(temp)
                        })
                        device.appendTo(app_info);
                    }
                    app_item.append(app_qrcode).append(app_info);
                    dd_contain.append(app_item);

                })
                // console.log(dd_contain[0]);
                dd.append(dd_contain);
            }
        })

    }

    function closeTopAD() {
        $(".close_ad_top").click(function () {
            $(".ad_top").css({
                display: "none"
            })
        })
    }
    $(".right_nav .my_JD").on("mouseover", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .my_JD .dd").css({
            display: "block"
        })
    })
    $(".right_nav .my_JD").on("mouseout", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .my_JD .dd").css({
            display: "none"
        })
    })
    $(".right_nav .enterprise").on("mouseover", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .enterprise .dd").css({
            display: "block"
        })
    })
    $(".right_nav .enterprise").on("mouseout", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .enterprise .dd").css({
            display: "none"
        })
    })
    $(".right_nav .service").on("mouseover", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .service .dd").css({
            display: "block"
        })
    })
    $(".right_nav .service").on("mouseout", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .service .dd").css({
            display: "none"
        })
    })
    $(".right_nav .web_nav").on("mouseover", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .web_nav .dd").css({
            display: "block"
        })
    })
    $(".right_nav .web_nav").on("mouseout", function () {
        $(this).toggleClass("hover_style");
        $(".right_nav .web_nav .dd").css({
            display: "none"
        })
    })
    $(".right_nav .app_JD").on("mouseover", function () {
        // $(this).toggleClass("hover_style");
        $(".right_nav .app_JD .dd").css({
            display: "block"
        })
    })
    $(".right_nav .app_JD").on("mouseout", function () {
        // $(this).toggleClass("hover_style");
        $(".right_nav .app_JD .dd").css({
            display: "none"
        })
    })

    function hotwords() {
        let hotwords = $(".right_contain .hotwords"),
            hotwords_contain = $(`<div class="hotwords_contain"></div>`);
        $.ajax({
            url: "/hotwords",
            dataType: "json",
            success: function (res) {
                res.data.forEach(function (item, index) {

                    let a = $(`<a href=${item.href}><span class = "wrod_item">${item.hotword}</span></a>`);
                    if (index == 0) {
                        a.addClass("style-red");
                    }
                    hotwords_contain.append(a);
                })
                hotwords.append(hotwords_contain);
            }
        })
    }

    function recommendWord() {
        let hotwords = $(".right_contain .hotwords .style-red");
        $.ajax({
            url: "/recommendWord",
            dataType: "json",
            success: function (res) {
                hotwords.attr("href", res.href).find("span").text(res.word);
            }
        })
    }

    function search_res(value) {
        let div = $(".right_contain .search .search_res"),
            ul = $("<ul></ul");

        $.ajax({
            url: "https://suggest.taobao.com/sug?code=utf-8&callback=jsonp526",
            data: {
                q: value
            },
            dataType: "jsonp",
            success: function (res) {
                div.empty();
                if (res.result.length == 0) {
                    div.css({
                        display: "none"
                    })
                } else {
                    res.result.forEach(function (item, index) {
                        let li = $(`<li><span class ="good">${item[0]}</span><span class ="goods_count">约${item[1].slice(0,item[1].indexOf('.'))}个商品</span></li>`);
                        ul.append(li);
                    })
                    div.append(ul)
                    div.css({
                        display: "block"
                    })
                }
            }
        })
    }

    function search_word() {
        let word = $(".right_contain .search .search_bg");
        $.ajax({
            url: "/recommendWord",
            dataType: "json",
            success: function (res) {
                word.text(res.word);
            }
        })
    }

    function creatNews() {
        let news_list = $('.main .news .news_list'),
            ul = $(`<ul></ul>`);
        $.ajax({
            url: "/getNews",
            dataType: 'json',
            success: function (res) {
                res.data.forEach(function (item, index) {
                    let li = $(`<li class="news_item"><a href=${item.newsUrl}><span class ="news_tag">${item.newsTag}</span>${item.newsTitel}</a></li>`);
                    li.appendTo(ul);
                })
                news_list.append(ul)
            }
        })
    }

    function creatMenu() {
        let menu = $('.main .main_contain .menu'),
            ul = $(`<ul class="menu_contain"></ul>`);
        $.ajax({
            url: "/menu",
            dataType: "json",
            success: function (res) {
                console.log(res.data)
                res.data.forEach(function (item, index) {
                    let li = $(`<li class="menuItem"></li>`)
                    item.titles.forEach((title, index) => {
                        let a = $(`<a href="${title.href}">${(index?'/':'')+title.name}</a>`)
                        li.append(a)
                    })
                    let pop_hd = $(`<ul class="pop_hd"></ul>`);
                    let menu_pop = $(`<div class="menu_pop" style='display:none'></div>`);

                    let pop_main = $(`<div class="pop_main"></div>`);
                    item.content.tabs.forEach(tab => {
                        let li = $(`<li><a href="${tab.href}">${tab.name}<i class="iconfont">&#xe625;</i></a></li>`)
                        pop_hd.append(li)

                    })

                    item.content.details.forEach(detail => {
                        let dl = $(`<dl></dl>`)

                        let dt = $(`<dt>${detail.category}<i class="iconfont">&#xe625;</i></dt>`)
                        let dd = $(`<dd></dd>`)
                        detail.items.forEach((item) => {
                            dd.append($(`<a href="${item.href}">${item.name}</a>`))
                        })
                        dl.append(dt).append(dd);
                        pop_main.append(dl)

                    })





                    menu_pop.append(pop_hd).append(pop_main)


                    li.append(menu_pop)
                    ul.append(li)

                })
                menu.append(ul)
                $(".menuItem").on("mouseover", function (e) {
                    $(e.currentTarget).find('.menu_pop').css({
                        display: "block",
                    })
                }).on("mouseout", e => {
                    $(e.currentTarget).find('.menu_pop').css({
                        display: "none"
                    })
                })

            }
        })

    }

    function creatGoods() {
        let goods = $(`.recommend .goods`);
        $.ajax({
            url: "/goods",
            dataType: 'json',
            success: function (res) {
                console.log(res)
                res.data.forEach(function (item, index) {
                    let idx = (item.price + '').indexOf('.')
                    let int = (item.price + '').slice(0, idx);
                    let dec = (item.price + '').slice(idx)
                    console.log(int, dec)

                    let goodItem = $(`<div class="goodItem"><img class="img" data-src="${item.img}" src="https://img0.baidu.com/it/u=4244824755,3374992408&fm=26&fmt=auto&gp=0.jpg" alt="">
                    <div class="desc">${item.desc}</div>
                    <div class="price">
                            <div class="int">${int}</div><sub>${dec}</sub>
                        </div></div>`);
                    goodItem.appendTo(goods);
                })
                lazyLoading(goods)


            }
        })
    }
    // search_res()
    window.jsonp526 = null;
    closeTopAD();
    creatLocation();
    my_JD();
    enterprise();
    service();
    webSites();
    JD_app()
    hotwords();
    search_word();
    creatNews();
    creatMenu();
    creatGoods();
    let searchWordTimer = setInterval(search_word, 6000);
    let hortWordTimer = setInterval(recommendWord, 4000);
    let inputTimer = null;
    let logoTimer = null;
    let logoFlag = true;
    let logoEnd = null;
    let searchTimer = null;
    $('.search .search_input').on("input", function (i) {
        if ($(this).val()) {
            $(this).css({
                backgroundColor: "#fff"
            })
        } else {
            $(this).css({
                backgroundColor: "transparent"
            })
        }
        clearTimeout(inputTimer);
        inputTimer = setTimeout(() => {
            // console.log(this)
            search_res($(this).val())
        }), 2000
    }).on("focus", () => {
        clearInterval(searchWordTimer);
        $(".search .search_bg").css({
            color: "rgb(200,200,200)"
        })
    }).on("blur", () => {
        clearInterval(searchWordTimer);
        searchWordTimer = setInterval(search_word, 6000);
        $(".search .search_bg").css({
            color: "#989898"
        })
        $(".search .search_res").css({
            display: "none"
        })
    }).on("mouseleave", function () {
        searchTimer = setTimeout(() => {
            $(".search .search_res").css({
                display: "none"
            })
        }, 1000);
    }).on("mouseenter", function () {
        clearTimeout(searchTimer)
    })
    $('.logo_scene').on("mouseenter", function () {
        clearInterval(logoEnd);
        if (logoFlag) {
            logoFlag = false;
            logoTimer = setTimeout(() => {
                // console.log($(this).find('.logo_scene_img')[0])
                $(this).find('.logo_scene_img').css({
                    backgroundImage: `url("https://img1.360buyimg.com/da/jfs/t1/16273/9/11655/153805/5c90a4f3E683206d9/eef283b0ed619fe4.gif?v=${Math.random()}")`
                }).fadeIn("nomal", () => {
                    setTimeout(() => {
                        $(this).find("span").fadeIn(function () {
                            setTimeout(() => {
                                logoFlag = true;
                            }, 2000);
                        });

                    }, 2000)
                })
            }, 500)
        }
    }).on("mouseleave", function () {
        // console.log("out")
        clearInterval(logoEnd);
        logoEnd = setInterval(() => {
            // console.log("out")
            if (logoFlag) {
                clearInterval(logoEnd);
                // console.log("clear了")
                $(this).find('.logo_scene_img').fadeOut();
                $(this).find('span').fadeOut();
            }
        }, 100);
    })

    $(".banner_contain").load("../../html/components/banner.html", function (res) {
        $(this).makeTrunPage({
            pageList: $(this).find(".focus-item__core"),
            hasBtn: true,
            hasSpotIndexes: true,
            type: "fade",
            isAutoPlay: true,
            changeTime: 5000,
            spotSize: 12,
            spotLocation: "left",
            isHoverStop: true
        })
    })

});