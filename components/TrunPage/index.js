function TrunPage(options, wrap) {
    this.hasBtn = options.hasBtn == undefined ? true : options.hasBtn; //是否有左右按钮 默认true
    this.hasSpotIndexes = options.hasSpotIndexes == undefined ? true : options.hasSpotIndexes; //是否有索引圆点 默认true
    this.type = options.type || "slide"; //轮播类型 默认slide 滑动
    this.isAutoPlay = options.isAutoPlay == undefined ? true : options.isAutoPlay; //是否自动轮播 默认true
    this.changeTime = options.changeTime || 2000; //轮播间隔时间 默认2000ms
    this.spotSize = options.spotSize || 10; //索引圆点大小 默认10px
    this.spotLocation = options.spotLocation || "center"; //索引圆点位置 默认"center"中间
    this.isHoverStop = options.isHoverStop == undefined ? true : options.isHoverStop; //是否移入暂停 默认 true
    this.pageList = options.pageList || []; //轮播图列表
    this.width = options.width || $(wrap).width(); //轮播图宽度
    this.height = options.height || $(wrap).height(); //轮播图高度
    this.len = options.pageList.length; //轮播图个数
    this.nowIndex = 0; //当前图片索引
    this.timer = null;
    this.wrap = wrap;
    this.lock = true;


    TrunPage.prototype.init = function () {
        this.creatDom();
        this.initStyle();
        this.bindEvent();
        if (this.isAutoPlay) {
            this.autoPlay();
        }
    }

    TrunPage.prototype.creatDom = function () {
        //轮播图包裹层
        let pageWraper = $(`<div class = 'imocl-pageWraper'></div>`),
            spotWraper = $(`<div class = 'imocl-spotWraper'></div>`),
            pageItems = $(`<ul class = 'imocl-pageItems'></ul>`),
            leftBtn = $(`<div class = 'imocl-leftBtn imocl-btn'><i class="imocl-icon">&#xe628;</i></div>`),
            rightBtn = $(`<div class = 'imocl-rightBtn imocl-btn'><i class="imocl-icon">&#xe625;</i></div>`);
        for (let i = 0; i < this.len; i++) {
            $(`<li class = "imocl-pageItem"></li>`).html(this.pageList[i]).appendTo(pageItems);
            $(`<span class = 'imocl-spot'></span>`).appendTo(spotWraper);
        }
        if (this.type == "slide") {
            $(`<li class = "imocl-pageItem"></li>`).html($(this.pageList[0]).clone(true)).appendTo(pageItems);
        }
        pageWraper.append(pageItems).append(leftBtn).append(rightBtn).append(spotWraper);
        wrap.append(pageWraper);
    }

    TrunPage.prototype.initStyle = function () {

        $(wrap).find(".imocl-pageItems").css({
            width: this.type === 'slide' ? (this.len + 1) * this.width : this.width,
            height: this.height
        }).find(".imocl-pageItem").css({
            width: this.width,
            height: this.height
        }).find("img").css({
            width: this.width,
            height: this.height
        });
        $(wrap).find(".imocl-btn").css({
            width: 25,
            height: 35,
            lineHeight: 35 + "px",
            display: this.hasBtn ? "blick" : "none"
        });
        $(wrap).find(".imocl-spot").css({
            width: this.spotSize,
            height: this.spotSize
        }).eq(this.nowIndex).toggleClass('imocl-spotActive');

        $(wrap).find(".imocl-spotWraper").css({
            display: this.hasSpotIndexes ? "block" : "none",
            width: this.width,
            textAlign: this.spotLocation
        })


    }

    TrunPage.prototype.bindEvent = function () {
        if (this.hasBtn) {

        }
        $(".imocl-leftBtn").click(() => {
            if (this.lock) {
                this.lock = false;
                if (this.nowIndex == 0 && this.type == "slide") {
                    $(".imocl-pageItems").css({
                        left: -this.len * this.width
                    });
                    this.nowIndex = this.len;
                } else if (this.nowIndex == 0) {
                    this.nowIndex = this.len;
                }
                this.nowIndex--;
                this.changePage();
            }
        });
        $(".imocl-rightBtn").click(() => {
            if (this.lock) {
                this.lock = false;
                if (this.nowIndex == this.len && this.type == "slide") {
                    $(".imocl-pageItems").css({
                        left: 0
                    });
                    this.nowIndex = 0;
                } else if (this.nowIndex == this.len - 1) {
                    this.nowIndex = -1;
                }
                this.nowIndex++;
                this.changePage();
            }

        });
        var that = this;
        $(this.wrap).find('.imocl-spotWraper').on('mouseenter', 'span', function () {
            // 拿取到当前小圆点的索引值
            var index = $(this).index();
            that.nowIndex = index;
            that.changePage();
            clearTimeout(that.timer)
            that.autoPlay();
        });
        if (this.isHoverStop) {
            $(this.wrap).find(".imocl-pageItems").on("mouseenter", function (e) {
                // console.log("over");
                clearTimeout(that.timer)
            }).on("mouseleave", function (e) {
                // console.log('out', e.target, this)
                clearTimeout(that.timer)
                that.autoPlay();
            });
        }

    }

    TrunPage.prototype.changePage = function () {
        // console.log("图片改变了")
        if (this.type == "slide") {
            $(".imocl-pageItems").animate({
                left: -this.nowIndex * this.width
            }, 1000, () => {
                this.lock = true;
                // console.log(this.timer)
                clearTimeout(this.timer);
                this.autoPlay();
            })
            let tempIndex = this.nowIndex == this.len ? 0 : this.nowIndex;
            $(".imocl-spot").removeClass('imocl-spotActive').eq(tempIndex).toggleClass('imocl-spotActive')
        } else {
            $(".imocl-pageItem").fadeOut("fast").eq(this.nowIndex).fadeIn();
            $(".imocl-spot").removeClass('imocl-spotActive').eq(this.nowIndex).toggleClass('imocl-spotActive');
            this.lock = true;
            clearTimeout(this.timer);
            this.autoPlay();
        }


    }

    TrunPage.prototype.autoPlay = function () {
        this.timer = setTimeout(() => {
            $(".imocl-rightBtn").trigger("click");
        }, this.changeTime);
    }
}
// 给jq的实例对象扩展swiper方法用来添加轮播图
$.fn.extend({
    makeTrunPage: function (options) {
        // 存储当前轮播图的所有数据
        // console.log(this);
        var obj = new TrunPage(options, this);
        obj.init();
    },
});