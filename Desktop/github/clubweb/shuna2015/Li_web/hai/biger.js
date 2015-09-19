 
var aimg = document.getElementsByTagName('img'); 
var s = null; 
var l = null; 
var step = 8; //调整改变尺寸的速度  
var step_ = step * 2; 
var maxWidth = aimg[0].width*1.5; //最大宽度  
var maxHeight =aimg[0].height*1.5 ; //最大高度 
var minWidth = 200; //最小宽度 
var minHeight = 150; //最小高度
function changeLarge(){ 
  clearInterval(s); 
  l = setInterval("larger()",1);  
  } 
 function changesmall(){ 
    clearInterval(l);
	s = setInterval("smaller()",1); 
 } 
for(var i=0;i<aimg.length;i++){
 function smaller(){  
 if(parseInt(aimg[i].width)>minWidth){ 
  aimg[i].style.marginLeft = parseInt(aimg[i].style.marginLeft)+step; 
  aimg[i].width = parseInt(aimg[i].width) - step_;  
  }else{ 
   clearInterval(s);  } 
 if(parseInt(aimg[i].height)>minHeight){ 
  aimg[i].style.marginTop = parseInt(aimg[i].style.marginTop)+step; 
   aimg[i].height = parseInt(aimg[i].height) - step_;
     }else{ 
	  clearInterval(s); 
	   }  
	  } 
function larger(){  
if(parseInt(aimg[i].width) <maxWidth){  
aimg[i].style.marginLeft = parseInt(aimg[i].style.marginLeft)-step; 
aimg[i].width = parseInt(aimg[i].width) + step_;  
 }else{ 
  clearInterval(l); 
 }  
 if(parseInt(aimg[i].height) <maxHeight){  
 aimg[i].style.marginTop = parseInt(aimg[i].style.marginTop)-step; 
aimg[i].height = parseInt(aimg[i].height) + step_; 
  }else{  
  clearInterval(l); 
   }  
   } 
}