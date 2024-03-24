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


// 尝试修改图片alt
const imgBlocks = document.querySelectorAll(".notion-selectable.notion-image-block");

// let's loop through each block and extract the caption and alt text values:

for(let i=0;i<imgBlocks.length;i++){
    const currentImgBlock = imgBlocks[i]; // Get the current block element
    
    // Find the <span> tag inside .notranslate div
    const spanTag = currentImgBlock.getElementsByClassName("notranslate")[0].firstChild;
    
    if(!spanTag){ continue; } // Skip if no span tag was found
    
    // Split the innerText of the span tag by ' - ' delimiter
    const [caption, ...rest] = spanTag.innerText.split(' - ');
    
    // Join rest array back together to form the alt text
    const altText = rest.join(' - ').trim();
}


// Create a new <img> element with src, width, height, and alt attributes
const newImageElement = document.createElement("IMG");
newImageElement.src = currentImgBlock.getAttribute("data-file-url");
newImageElement.width = currentImgBlock.style.width || "";
newImageElement.height = currentImgBlock.style.height || "";
newImageElement.setAttribute("alt", altText);

// Remove old <img>, insert new <img> with updated properties
currentImgBlock.removeChild(currentImgBlock.children[0]);
currentImgBlock.appendChild(newImageElement);

// Select the .notranslate div and remove it entirely
const translateDiv = currentImgBlock.getElementsByClassName("notranslate")[0];
translateDiv && translateDiv.parentNode.removeChild(translateDiv);



