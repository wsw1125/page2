function myAddEvent(obj, sEv, fn)  //事件绑定
{
	if (obj.attachEvent) 
	{
		obj.attachEvent('on'+sEv, function(){
			if(false==fn.call(obj))
			{
				event.cancelBubble=true;
				return false;
			};
		});
	}else
	{
		obj.addEventListener(sEv, function(ev){
			if(false==fn.call(obj))
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			};
		}, false);
	}
}
function getByclass(oParent, sClass) 	//获取class名字
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	for(i=0; i<aEle.length; i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
function getStyle(obj,attr) 	//获取不在行间的样式
{
	if (obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{

		return getComputedStyle(obj, false)[attr];
	}
}
//夸浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth!='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}
//构造函数
function NQery(vArg)
{
	//保存选中的元素
	this.elements=[];
	switch(typeof vArg)
	{
		case 'function':
			myAddEvent(window, 'load', vArg);
			break;
		case 'string':
			switch(vArg.charAt(0))
			{
				case '#':	//ID
					var obj=document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case '.': 	//class
					this.elements=getByclass(document, vArg.substring(1));
					break
				default: 
					this.elements=document.getElementsByTagName(vArg);	//tagName
			}
			break;
		case 'object':
			this.elements.push(vArg);
			break;
	}
}

NQery.prototype.click=function(fn)
{
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		myAddEvent(this.elements[i], 'click', fn);
	};
	return this;
};

NQery.prototype.bind=function(sEv,fn)
{
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		myAddEvent(this.elements[i], sEv, fn);
	}
};

NQery.prototype.hide=function()
{
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		this.elements[i].style.display='none';
	}
	return this;
};

NQery.prototype.show=function()
{
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		this.elements[i].style.display='block';
	}
	return this;
};

NQery.prototype.hover=function(fnOver,fnOut)
{
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		myAddEvent(this.elements[i], 'mouseover', fnOver);
		myAddEvent(this.elements[i], 'mouseout', fnOut)
	}
	return this;
};

NQery.prototype.css=function(attr, value)
{
	if (arguments.length==2) //设置样式
	{
		var i=0;
		for(i=0; i<this.elements.length; i++)
		{
			this.elements[i].style[attr]=value;
		}
	}
	else  	
	{
		if (typeof attr=='string')  	//获取样式
		{
			return getStyle(this.elements[0], attr);
		}
		else
		{
			for(i=0; i<this.elements.length; i++)
			{
				var k='';
				for(k in attr)
				{
					this.elements[i].style[k]=attr[k];
				}
			}
		}
	}
	return this; 
};

NQery.prototype.attr=function(attr, value)
{
	if (arguments.length==2) //设置属性
	{
		var i=0;
		for(i=0; i<this.elements.length; i++)
		{
			this.elements[i][attr]=value;
		}
	}
	else  	//获取属性
	{
		return this.elements[0][attr];
	}
	return this;
};
NQery.prototype.width=function(value)
{
	if(arguments.length==1)	//设置宽度
	{
		var i=0;
		for(i=0; i<this.elements.length; i++)
		{
			this.elements[i].style.width=value+'px';
		}
	}
	else
	{	//获取宽度
		return parseInt(getStyle(this.elements[0],'width'));
		//return getStyle(this.elements[0],'width');
	}
	return this;
}
NQery.prototype.height=function(value)
{
	if(arguments.length==1)	//设置高度
	{
		var i=0;
		for(i=0; i<this.elements.length; i++)
		{
			this.elements[i].style.height=value+'px';
		}
	}
	else
	{	//获取高度
		return parseInt(getStyle(this.elements[0],'height'));
	}
	return this;
}
NQery.prototype.toggle=function()
{
	var i=0;
	var _arguments=arguments;
	for(i=0; i<this.elements.length; i++)
	{
		addToggle(this.elements[i]);
	}
	function addToggle(obj)
	{
		var count=0;
		myAddEvent(obj, 'click', function(){
			_arguments[count++%_arguments.length].call(obj);
		});
	}
	return this;
};

NQery.prototype.eq=function(n)
{
	return $(this.elements[n]);
};

function appendArr(arr1, arr2)
{
	var i=0;
	for(i=0; i<arr2.length; i++)
	{
		arr1.push(arr2[i]);
	}
}

NQery.prototype.find=function(str)
{
	var i=0;
	var aResult=[];
	for(i=0; i<this.elements.length; i++)
	{
		switch(str.charAt(0))
		{
			case '.': 	//css
				var aEle=getByclass(this.elements[i], str.substring(1));
				aResult=aResult.concat(aEle);
				break;
			default: 	//标签
				var aEle=this.elements[i].getElementsByTagName(str);
				appendArr(aResult, aEle);
				break;
		}
	}
	var newVquery=$();
	newVquery.elements=aResult;
	return newVquery;
};
function getIndex(obj)  	//获取到元素的序号
{
	var aBrother=obj.parentNode.children;
	var i=0;
	for(i=0; i<aBrother.length; i++)
	{
		if(aBrother[i]==obj)
		{
			return i;
		}
	}
}
NQery.prototype.index=function()
{
	return getIndex(this.elements[0]);
}

NQery.prototype.extend=function(name, fn)
{
	NQery.prototype[name]=fn;
};

$().extend('size', function(){
	return this.elements.length;
});

function $(vArg)
{
	return new NQery(vArg);
}


$().extend('offsetTop',function(){
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		return offsetTop(this.elements[i]);
	}

	function offsetTop(element){

		var top=element.offsetTop;
		var parent=element.offsetParent;
		while(parent){
			top+=parent.offsetTop;
			parent=parent.offsetParent;
		}
		return top;
	}

});

$().extend('centerImg', function(){
	var i=0;
	for(i=0; i<this.elements.length; i++)
	{
		centerImg(this.elements[i]);
	}
	//图片居中显示
	function centerImg(aImg){
		// toReSize();
		var imgWidth=parseInt(aImg.offsetWidth);
		window.onresize=function(){
			toReSize();
		}
		toReSize()
		function toReSize(){
			//var veiWinth=document.documentElement.clientWidth;
			var veiWinth=document.body.clientWidth||document.docuemntElement.clientWidth;
			if(veiWinth>1000){
				aImg.style.left=-(imgWidth-veiWinth)/2+'px';
			}
		}
	}

});

$().extend('animate', function (json){
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		startMove(this.elements[i], json);
	}
	
	function getStyle(obj, attr)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];
		}
		else
		{
			return getComputedStyle(obj, false)[attr];
		}
	}
	
	function startMove(obj, json, fn)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		//这一次运动就结束了——所有的值都到达了
			for(var attr in json)
			{
				//1.取当前的值
				var iCur=0;
				
				if(attr=='opacity')
				{
					iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
				}
				else
				{
					iCur=parseInt(getStyle(obj, attr));
				}
				
				//2.算速度
				var iSpeed=(json[attr]-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				
				//3.检测停止
				if(iCur!=json[attr])
				{
					bStop=false;
				}
				
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else
				{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
				
				if(fn)
				{
					fn();
				}
			}
		},15)
	}
});