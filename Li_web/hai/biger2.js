 
var img = document.getElementById("2l");  
var s = null; 
var l = null; 
var step = 8; //调整改变尺寸的速度  
var step_ = step * 2; 
var maxWidth = img.width*1.5; //最大宽度  
var maxHeight =img.height*1.5 ; //最大高度 
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
function smaller(){  
 if(parseInt(img.width)>minWidth){ 
  img.style.marginLeft = parseInt(img.style.marginLeft)+step; 
  img.width = parseInt(img.width) - step_;  
  }else{ 
   clearInterval(s);  } 
 if(parseInt(img.height)>minHeight){ 
  img.style.marginTop = parseInt(img.style.marginTop)+step; 
   img.height = parseInt(img.height) - step_;
     }else{ 
	  clearInterval(s); 
	   }  
	  } 
function larger(){  
if(parseInt(img.width) <maxWidth){  
img.style.marginLeft = parseInt(img.style.marginLeft)-step; 
img.width = parseInt(img.width) + step_;  
 }else{ 
  clearInterval(l); 
 }  
 if(parseInt(img.height) <maxHeight){  
 img.style.marginTop = parseInt(img.style.marginTop)-step; 
 img.height = parseInt(img.height) + step_; 
  }else{  
  clearInterval(l); 
   }  
   } 