/**
 * Created by ��^...^�� on 2018/6/18.
 */

$(function() {
    /**
     * ͨ��id����ȡԪ��
     * @param str
     * @returns {Element}
     */
    function id(str) {
        return document.getElementById(str);
    }

    /**
     * ͨ��������ȡԪ��
     * @param str
     * @returns {Element}
     */
    function clss(str) {
        return document.getElementsByClassName(str);
    }

    /**
     * ʱ����ת
     */
   ;(function() {
        function autoClick(ele) {
            //�������Զ���תʵ��
            //var clock = id('clock');
            var i = 0;
            ele.timeID = setInterval(function() {
                ele.style.transform = 'rotate('+(i)+'deg)';
                i+=5;
            },15);
        }
        //��������תʱ��
        var clock01 = id('clock01');
        autoClick(clock01);
        //�������ģ��ʱ��
        var clock02 = id('clock02');
        autoClick(clock02);
        //��ϷӰ����������ת��ʱ��
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
     * ��ά������ɨ��
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
     * �����ֲ�+�Զ��ֲ�+�޷��ֲ�
     */
    ;(function () {
        //��ȡԪ��
        var numList = clss("idx")[0].children;
        var ul = clss("pic")[0];
        var moveWidth = 693;
        var timeID;
        var index = 0;
        var numIndex = 0;
        for(var i=0; i<numList.length; i++){
            //�������
            numList[i].setAttribute("index",i);
            //��ӵ���¼�
            numList[i].onclick = function() {
                //����ı���ͼ�걳��
                for(var i=0;i<numList.length; i++){
                    numList[i].style.background = "url('imgs/19-2.jpg') no-repeat";
                }
                this.style.background = "url('imgs/19.jpg') no-repeat";
                var target = -this.getAttribute("index") * moveWidth;
                animation(ul,target);
                numIndex = index = this.getAttribute("index");
            };
        }

        //�Զ��ֲ�
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
     * ������װ
     * @param ele ��Ҫ��ʱ����Ԫ��
     * @param target Ŀ��λ��
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
     * ������Ѷ���,�л�������ʽ�Լ���Ӧul�ı�
     */
    ;(function() {
        //������Ѷ-��������Ӧul��ʾ
        var $titleUl = $('.particulars-title>ul>li');
        var $newUl = $('.activity>ul');
        $titleUl.click(function() {
            //�ö�Ӧ�����б�ѡ����ʽ
            $titleUl.removeAttr('flag');
            $(this).attr('flag',true);
        });
        //������������Լ���һ�����б���
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
     * ��Ϸ��ɫ֮�ַ���
     */
    ;(function() {
        var $liList = $('.feature-content>ul>li');
        var $box = $('.feature-content');
        //��������л�
        $liList.mouseenter(function() {
            $(this).find('.b-img').stop(true,false).show().parent().siblings('li').find('.b-img').stop(true,false).hide();
            $(this).find('.s-img').stop(true,false).hide().parent().siblings('li').find('.s-img').stop(true,false).show();
        });
        //һ������ӻָ���ʼ״̬
        $box.mouseleave(function() {
            $($liList[0]).find('.s-img').stop(true,false).hide().parent().siblings('li').find('.s-img').show();
            $($liList[0]).find('.b-img').stop(true,false).show().parent().siblings('li').find('.b-img').hide();
        });

    }());

    /**
     * ������ܰ��
     */
    ;(function() {
        var $btnList = $('.btn>ul>li');
        var $introduceList = $('.person-introduce>ul>li');
        var $portraitList = $('.portrait>ul>li');
        $btnList.click(function() {
            //�����б���ͼƬ
            $(this).addClass('pic').siblings('li').removeClass('pic');
            //��Ӧ���������ʾ��������
            var index = $(this).index();
            index = index==0? 0: index/2;
            console.log(index);
            $introduceList.eq(index).show().siblings('li').hide();
            //��Ӧ����ͼƬ����������������
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
     * ��ϷӰ������
     */
    ;(function() {
        var $titList = $('.media-nav>ul>li>a');
        $titList.click(function() {
            $(this).addClass('red-bg').parent().siblings('li').find('a').removeClass('red-bg');
        });
        //���������ʾû�����ֲ��ͼƬ
        var $gameList = $('.game-video li');
        $gameList.on('mouseenter',function() {
            $(this).find('i').hide();
        });
        $gameList.on('mouseleave',function() {
            $(this).find('i').show();
        });
    }());

});