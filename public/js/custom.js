// 这里编写自定义js脚本；将被静态引入到页面中
// Get all <a> tags
var aTags = document.querySelectorAll('.notion-gallery-grid a');

// Loop through each <a> tag
aTags.forEach(function(aTag) {
  // Get the nested <form> within the current <a> tag
  var form = aTag.querySelector('form');
  
  // Get the action URL from the nested <form>
  var formAction = form.getAttribute('action');
  
  // Replace the href attribute of the <a> tag with the form's action URL
  aTag.setAttribute('href', formAction);
});
