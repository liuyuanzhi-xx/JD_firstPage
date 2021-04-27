function creatLocation() {
    let dd = $(".location .dd"),
        list_contan = $(`<div class="list_contan"></div>`),
        mainLand = $(`<div class="mianLand"></div>`),
        special = $(`<div class = "special"></div>`),
        AvailableSites = $(`<div class = "AvailableSites"></div>`),
        line = $(`<div class="line"></div>`),
        specialTitle = $(`<div class="special_Title">地区专享版本</div>`),
        AvailableSitesTitle = $(`<div class="AvailableSites_Title">Available Sites</div>`);
    $.ajax({
        url: '/location',
        dataType: "json",
        success: function (res) {
            console.log(res)
            res.data.mainLand.forEach(
                function (index, key) {
                    let item = $(`<a href = 'http://127.0.0.1:5500/jd/html/views/index.html?locationId=${index.id}'><div class = "city_item item" data-id = ${key}>${index.city}</div></a>`);
                    mainLand.append(item);

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
                    console.log(index);
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