let slideshowButton = document.getElementById('slideshow');
  
slideshowButton.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.insertCSS(tabs[0].id, { file: "jquery.fancybox.css" }, function() {
			chrome.tabs.executeScript(tabs[0].id, { file: "jquery-3.3.1.js" }, function() {
				chrome.tabs.executeScript(tabs[0].id, { file: "jquery.fancybox.js" }, function() {	
					chrome.tabs.executeScript(tabs[0].id, { file: "injected.js" });
				});
			});
		});
	});
};