$(function(){
	var bannerimg=$('#banner').find('img');
	var bannerul=$('#banner').find('ul');
	var num=bannerimg.size();
	var imgWidth=bannerimg.width();
	var ser=$('#ser');
	var aboutimg=$('#about').find('.about-img');
	var imageul=$('#image').find('ul');
	var website=$('#website');
	var footform=$('#footer').find('form');
	scrollload(ser,{'marginTop':'0'});
	scrollload(aboutimg,{'marginTop':'0'});
	scrollload(imageul,{'marginTop':'0'});
	scrollload(website,{'left':'250'});
	scrollload(footform,{'right':'250'});
	var scrollTops=document.documentElement.scrollTop||document.body.scrollTop;

	var timer=null; //定义一个定时器
	var isTop=true; //定义一个布尔值，用于判断是否到达顶部
	var tops=$('#about').offsetTop();
	bannerul.width(num*imgWidth);//图片居中
	bannerimg.centerImg();
	
	//返回顶部按钮的隐藏和显示
	goTop();
	function goTop(){
		if(scrollTops>=200){
			$('#gotop').animate({'opacity':'100'});
		}else{
			$('#gotop').animate({'opacity':'0'});
		}
	}
	parscroll(scrollTops);
	function parscroll(scrollTops){
		var scrotop=-scrollTops/3+'px';
		$('#banner').css('top',scrotop);
		var serbgtop=scrollTops/3-680+'px';
		$('#serivce').find('.serbg').css('top',serbgtop);
		var modbgtop=scrollTops/3-790+'px';
		$('#module').find('.modbg').css('top',modbgtop);
	};
	$(window).bind('scroll',function(){
		scrollTops=document.documentElement.scrollTop||document.body.scrollTop;
		// alert(scrollTops);
		parscroll(scrollTops);

		setTimeout(goTop(),100);	//返回顶部按钮的隐藏和显示
		if(!isTop){
			clearInterval(timer);
        }
        isTop=false;
	});

	$('#nwes-con').hover(function(){
		$('#nwes-con').find('.info').animate({'left':'200'});
		$('#nwes-con').find('.date').animate({'right':'300'});
		$('#nwes-con').find('.news-next').animate({'right':'220'});
		$('#nwes-con').find('.date').css('color','#fff');
		$('#nwes-con').find('p').css('color','#fff');
		$('#nwes-con').find('h4').css('color','#fff');
	},function(){
		$('#nwes-con').find('.info').animate({'left':'250'});
		$('#nwes-con').find('.date').animate({'right':'250'});
		$('#nwes-con').find('.news-next').animate({'right':'240'});
		$('#nwes-con').find('.date').css('color','#03d522');
		$('#nwes-con').find('p').css('color','#a5a5a5');
		$('#nwes-con').find('h4').css('color','#464646');
	});
	//返回顶部
	$('#gotop').click(function(){
		timer=setInterval(function(){
			var scTops=document.documentElement.scrollTop||document.body.scrollTop;
			var speed=Math.floor(-scTops / 6);
			document.documentElement.scrollTop=document.body.scrollTop=scTops+speed;
			isTop=true;  //用于阻止滚动事件清除定时器
			if(scTops==0){
                clearInterval(timer);
            }
		},30);
	});


});
function scrollload(oDiv,json){
	$(window).bind('scroll',function(){
		var scTop=document.documentElement.scrollTop||document.body.scrollTop;
		var getInners=getInner().height+scTop;
		if(getInners>=oDiv.offsetTop()){
			oDiv.animate(json);
		};
	})
}





