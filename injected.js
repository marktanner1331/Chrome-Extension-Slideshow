var urls = [];
for(var img of $("img")) {
	urls.push(img.src);
}

for(var backgroundImage of findAllBackgroundImages()) {
	urls.push(backgroundImage);
}

urls = distinct(urls);

var images = [];
for(var url of urls) {
	images.push("<img src=\"" + url + "\" style=\"width: 100% !important;height: 100% !important;display: inline-block;object-fit: contain;\" />");
}

$.fancybox.open(images, {
	toolbar: true,
	modal: false,
	padding: 25,
	showCloseButton: true,
	hideOnOverlayClick: true,
	titlePosition: 'outside',
	enableEscapeButton: true,
	type: 'image',
});

function distinct(arr) {
	return arr.filter(onlyUnique);
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function findAllBackgroundImages() {
	var tags = document.getElementsByTagName('*');
    var el;
	var backgroundImages = [];

	for (var i = 0, len = tags.length; i < len; i++) {
		el = tags[i];
		if (el.currentStyle) {
			var backgroundImage = el.currentStyle['backgroundImage'];
			if(backgroundImage !== 'none') {
				backgroundImages.push(backgroundImage);
			}
		}
		else if (window.getComputedStyle) {
		var backgroundImage = document.defaultView.getComputedStyle(el, null).getPropertyValue('background-image');
			if(backgroundImage !== 'none') 
				backgroundImages.push(backgroundImage);
		}
	}

	var sanitizedImages = [];
	var regex = /url\((?:"|')(.+)(?:"|')\)/;

	for(var backgroundImage of backgroundImages) {
		if(regex.test(backgroundImage)) {
			sanitizedImages.push(regex.exec(backgroundImage)[1]);
		}
	}

	return sanitizedImages;
}