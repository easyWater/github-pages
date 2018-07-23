/**
 * Created by 淑^...^珍 on 2018/6/18.
 */

$(function() {
    /**
     * 通过id名获取元素
     * @param str
     * @returns {Element}
     */
    function id(str) {
        return document.getElementById(str);
    }

    /**
     * 通过类名获取元素
     * @param str
     * @returns {Element}
     */
    function clss(str) {
        return document.getElementsByClassName(str);
    }

    /**
     * 时钟旋转
     */
   ;(function() {
        function autoClick(ele) {
            //主体中自动旋转实现
            //var clock = id('clock');
            var i = 0;
            ele.timeID = setInterval(function() {
                ele.style.transform = 'rotate('+(i)+'deg)';
                i+=5;
            },15);
        }
        //主体中旋转时钟
        var clock01 = id('clock01');
        autoClick(clock01);
        //人物介绍模块时钟
        var clock02 = id('clock02');
        autoClick(clock02);
        //游戏影音中六个旋转计时器
        var clock03 = id('clock03');
        autoClick(clock03);

        var clock04 = id('clock04');
        autoClick(clock04);

        var clock05 = id('clock05');
        autoClick(clock05);

        var clock06 = id('clock06');
        autoClick(clock06);

        var clock07 = id('clock07');
        autoClick(clock07);

        var clock08 = id('clock08');
        autoClick(clock08);

        var arr = [clock03,clock04,clock05,clock06,clock07,clock08];
        for(var i=0; i<arr.length; i++){
            arr[i].onmouseenter = function() {
                clearInterval(this.timeID);
            };
            arr[i].onmouseleave = function() {
                autoClick(this);
            }
        }
    }());


    /**
     * 二维码上下扫描
     */
    ;(function() {
        var qrWire = id('qr-wire');
        var h = 1;
        var record = 1;
        setInterval(function() {
            if(h == 115 || h == 0) {
                record++;
            }
            record%2 ==0 ? qrWire.style.top = (h--)+'px': qrWire.style.top = (h++)+'px';
        },10);
    }());

    /**
     * 焦点轮播+自动轮播+无缝轮播
     */
    ;(function () {
        //获取元素
        var numList = clss("idx")[0].children;
        var ul = clss("pic")[0];
        var moveWidth = 693;
        var timeID;
        var index = 0;
        var numIndex = 0;
        for(var i=0; i<numList.length; i++){
            //添加索引
            numList[i].setAttribute("index",i);
            //添加点击事件
            numList[i].onclick = function() {
                //点击改变下图标背景
                for(var i=0;i<numList.length; i++){
                    numList[i].style.background = "url('imgs/19-2.jpg') no-repeat";
                }
                this.style.background = "url('imgs/19.jpg') no-repeat";
                var target = -this.getAttribute("index") * moveWidth;
                animation(ul,target);
                numIndex = index = this.getAttribute("index");
            };
        }

        //自动轮播
        ul.appendChild(ul.children[0].cloneNode(true));
        function auto() {
            timeID = setInterval(function() {
                if(index == 3) {
                    index = 0;
                    ul.style.left = '0px';
                }
                index++;
                var target = -index*moveWidth;
                animation(ul,target);

                if(numIndex < 2){
                    numIndex++;
                }else {
                    numIndex = 0;
                }

                for(var i=0;i<numList.length; i++){
                    numList[i].style.background = "url('imgs/19-2.jpg') no-repeat";
                }
                numList[numIndex].style.background = "url('imgs/19.jpg') no-repeat";
            },3000);
        }
        auto();
    }());

    /**
     * 动画封装
     * @param ele 需要计时器的元素
     * @param target 目标位置
     */
    function animation(ele,target) {
        clearInterval(ele.timeID);
        ele.timeID = setInterval(function() {
            var current = ele.offsetLeft;
            var step = (target - current);
            step = step > 0 ? Math.ceil(step/10) : Math.floor(step/10);
            current += step;
            ele.style.left = current + "px";
            if(current == target ){
                clearInterval(ele.timeID);
            }
        },15);
    }

    /**
     * 新闻资讯板块,切换标题样式以及对应ul改变
     */
    ;(function() {
        //新闻资讯-点击标题对应ul显示
        var $titleUl = $('.particulars-title>ul>li');
        var $newUl = $('.activity>ul');
        $titleUl.click(function() {
            //让对应标题有被选中样式
            $titleUl.removeAttr('flag');
            $(this).attr('flag',true);
        });
        //鼠标移入自身以及第一个都有背景
        $titleUl.mouseenter(function() {
            $(this).addClass('current').siblings('li').removeClass('current');
            var index = $(this).index();
            $newUl.eq(index).show().siblings('ul').hide();
        });
        $titleUl.mouseleave(function() {
            $titleUl.removeClass('current');
            $titleUl.each(function(index,ele) {
                if($(ele).attr('flag')) {
                    $(ele).addClass('current').siblings('li').removeClass('current');
                }
            });
        });
    }());


    /**
     * 游戏特色之手风琴
     */
    ;(function() {
        var $liList = $('.feature-content>ul>li');
        var $box = $('.feature-content');
        //鼠标移入切换
        $liList.mouseenter(function() {
            $(this).find('.b-img').stop(true,false).show().parent().siblings('li').find('.b-img').stop(true,false).hide();
            $(this).find('.s-img').stop(true,false).hide().parent().siblings('li').find('.s-img').stop(true,false).show();
        });
        //一开大盒子恢复初始状态
        $box.mouseleave(function() {
            $($liList[0]).find('.s-img').stop(true,false).hide().parent().siblings('li').find('.s-img').show();
            $($liList[0]).find('.b-img').stop(true,false).show().parent().siblings('li').find('.b-img').hide();
        });

    }());

    /**
     * 人物介绍板块
     */
    ;(function() {
        var $btnList = $('.btn>ul>li');
        var $introduceList = $('.person-introduce>ul>li');
        var $portraitList = $('.portrait>ul>li');
        $btnList.click(function() {
            //自身有背景图片
            $(this).addClass('pic').siblings('li').removeClass('pic');
            //对应人物介绍显示其他隐藏
            var index = $(this).index();
            index = index==0? 0: index/2;
            console.log(index);
            $introduceList.eq(index).show().siblings('li').hide();
            //对应人物图片动画出现其他隐藏
            $portraitList.eq(index).siblings('li').hide();
            $portraitList.eq(index).show(function() {
                $portraitList.eq(index).stop(true,false).animate({
                    right: 0
                },300,function() {
                    $portraitList.eq(index).animate({
                        left: 10
                    },180);
                });
            });
        });
    }());

    /**
     * 游戏影音标题
     */
    ;(function() {
        var $titList = $('.media-nav>ul>li>a');
        $titList.click(function() {
            $(this).addClass('red-bg').parent().siblings('li').find('a').removeClass('red-bg');
        });
        //鼠标移入显示没有遮罩层的图片
        var $gameList = $('.game-video li');
        $gameList.on('mouseenter',function() {
            $(this).find('i').hide();
        });
        $gameList.on('mouseleave',function() {
            $(this).find('i').show();
        });
    }());

});