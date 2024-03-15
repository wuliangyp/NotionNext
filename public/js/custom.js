// 这里编写自定义js脚本；将被静态引入到页面中
var formAction = document.querySelector('form').getAttribute('action');

var aTags = document.querySelectorAll('.notion-gallery-grid a');

aTags.forEach(function(aTag) {
  aTag.closest('.notion-gallery-grid').addEventListener('click', function(event) {
    event.preventDefault();
    window.open(formAction);
  });
});
