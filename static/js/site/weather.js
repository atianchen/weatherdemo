/**
 * Created by inc.courser on 2015/11/9.
 */

require(['domReady'], function (domReady) {
    domReady(function () {
        require(['jquery','jqm','dateService'], function   ($,jqm,dateService) {
            var zoom=0.5;
            var scenics=[{x:320,y:130,code:''},{x:710,y:410,code:''},{x:1070,y:650,code:''},{x:650,y:678,code:''},{x:465,y:758,code:''}];
            for (var i=0;i<scenics.length;i++)
            {
                $("<div class='sce'/>").appendTo($("#main")).css({"left":scenics[i].x*0.5+"px","top":scenics[i].y*0.5+"px"}).on("tap",function(){
                    var nw = 30+$("div.board").outerWidth();
                    var t = $(this).position().top-($("#notice").height()/2);
                    var l = $(this).position().left+$(this).width();
                    var lw = $(document.body).width()+$(document).scrollLeft();
                    if (t<0)
                    {t = 15; }
                    else if ((t+$(this).height())>$(window).height())
                    { t = $(window).height()-$(this).height()-15; }
                    $("div.ipt").css({top:$(this).position().top-t-15});

                    if ((l+nw)>lw && ($(this).position().left-nw)>0)
                    {
                        l = $(this).position().left-nw;
                        $("div.board").css("left","0px");
                        $("div.ipt").css({"left":$("div.board").outerWidth()-1,"transform":"rotate(180deg)"});
                    }
                    else
                    {
                        $("div.board").css("left","29px");
                        $("div.ipt").css({"left":"0px","transform":"rotate(0deg)"});
                    }
                    $("div.spinner").show();
                    $("div.bi").hide();
                    $("#notice").css({left:l,top:t}).show();
                    $.getJSON("http://218.244.144.46:8080/GridManage/ws/getWeatherInfo.html?unit=gm", function(data){
                        if (data.weather)
                        {
                           $("div.temp").html(data.weather.temp);
                            $("div.hr").html(data.weather.hr);
                            $("div.lux").html(data.weather.lux);
                            $("div.uv").html(data.weather.uv);
                            $("div.pm").html(data.weather.pm);
                            $("div.niap").html(data.weather.niap);
                            $("div.ws").html(data.weather.ws);
                            $("div.wd").html(getDirection(data.weather.wd));
                            $("div.rf").html(data.weather.rf);
                            $("div.sm").html(data.weather.sm);
                            $("div.st").html(data.weather.st);
                            var d = new Date();
                            d.setTime(data.weather.reportTime)
                            $("span.updatetime").html(dateService(d,"yyyy-MM-dd hh:mm:ss"));
                            $("div.spinner").fadeOut("slow",function()
                            {
                                $("div.bi").fadeIn("slow");
                            });

                        }
                    });
                });
            }

            function getDirection(angle)
            {
                if (angle>=350 && angle<=10)
                {
                    return "北";
                }
                else  if (angle>10 && angle<80)
                {
                    return "东北";
                }
                else  if  (angle>=80 && angle<=100)
                {
                    return "东";
                }
                else  if  (angle>100 && angle<170)
                {
                    return "东南";
                }
                else  if  (angle>=170 && angle<=190)
                {
                    return "南";
                }
                else  if  (angle>190 && angle<260)
                {
                    return "西南";
                }
                else  if  (angle>=260 && angle<=280)
                {
                    return "西";
                }
                else
                {
                    return "西北";
                }
            }
        });
    });
});

