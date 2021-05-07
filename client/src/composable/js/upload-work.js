 //读取文件

   var reader = new FileReader();

   reader.onload = function(e) {
    debugger
     var data = e.target.result;
 
   preview.style.backgroundImage = 'url('+ data + ')';
 
 
 
   };