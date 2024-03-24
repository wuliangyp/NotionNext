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
// Retrieve all image wrappers
var imageWrappers = document.querySelectorAll('.notion-asset-wrapper-image');

// Loop through each wrapper
for (var i = 0; i < imageWrappers.length; i++) {
  var currentWrapper = imageWrappers[i]; // Current wrapper being processed

  // Locate the caption element
  var captionEl = currentWrapper.querySelector('.notion-asset-caption');

  // Check if the caption exists
  if (!captionEl) {
    console.error(`Error: No caption found for ${currentWrapper}. Skipping.`);
    continue; // Move onto the next iteration
  }

  // Isolate the ALT text from the caption
  var rawAltText = captionEl.textContent;
  var altTextParts = rawAltText.match(/(?<=-\ )(.*)/); // RegEx pattern to match '- ' followed by text
  var altText = '';

  // Handle variations in formatting
  if (altTextParts !== null) {
    altText = altTextParts[0]; // Assign the captured group to altText
  } else {
    altText = rawAltText; // Fallback to full caption text if no hyphen present
  }

  // Locate the embedded <img> tag
  var imageTag = currentWrapper.querySelector('img');

  // Verify existence of the <img> tag
  if (!imageTag) {
    console.error(`Error: Couldn't find an <img> tag for ${currentWrapper}. Skipping.`);
    continue; // Proceed to the next iteration
  }

  // Insert the ALT text into the <img> tag
  imageTag.setAttribute('alt', altText);
  console.info(`Successfully added ALT text "${altText}" for ${imageTag}.`);
}


