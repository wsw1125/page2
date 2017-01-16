$(function(){
	$('.bgimg').find('img').centerImg();  //背景图居中
	var	scrollTops=document.documentElement.scrollTop||document.body.scrollTop;
	var header=$('#header');
	var bghead=$('.bghead');
	var logo=$('#logo');
	hiedNav();
	function hiedNav(){
		if(scrollTops>=5){
			header.animate({'height':'60','lineHeight':'60'});
			bghead.animate({'opacity':'100','height':'60'});
			logo.animate({'top':'5'});
		}else{
			header.animate({'height':'80','lineHeight':'80'});
			bghead.animate({'opacity':'0','height':'80'});
			logo.animate({'top':'15'});
		};
	};
	
	$(window).bind('scroll',function(){
		scrollTops=document.documentElement.scrollTop||document.body.scrollTop;
		hiedNav();
	});

	var desimg=$('#des').find('img');
	var desa=$('#des').find('a');
	var desp=$('#des').find('p');
	var desli=$('#des').find('li');
	desli.hover(function(){
		desimg.eq($(this).index()).animate({'width':'300','top':'-25','left':'-25'});
		desa.eq($(this).index()).css({'color':'#03d522'}).animate({'top':'10'});
		desp.eq($(this).index()).animate({'top':'10','opacity':'0'});
	},function(){
		desimg.eq($(this).index()).animate({'width':'250','top':'0','left':'0'});
		desa.eq($(this).index()).css({'color':'#333'}).animate({'top':'0'});
		desp.eq($(this).index()).animate({'top':'20','opacity':'100'});
	});
});


