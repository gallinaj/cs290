var gistList = [];


/*Function to create request object and check browser type.
Sourced from https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started 
*/
function fetchGists() {
 	var xmlhttp;
	if(window.XMLHttpRequest) {			//For Mozilla, Safari, IE7+
		xmlhttp = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {							//For IE6 and older
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(!xmlhttp) {
		alert ('Unable to create HTTPRequest.');
	}	
	
	//Checks if the number of pages entered is in range
//	var pages = document.getElementsByName('pageNumber')[0].value;
	var pages = document.getElementsByName('pageNumber');

	if(pages > 5) {
		pages = 5;
		alert('Invalid entry; returning 5 pages.');
	}
	else if(pages < 1) {
		pages = 1;
		alert('Invalid entry; returning 1 page.');
	}

	for (var i = 0; i < pages[0].value; ++i) {
		var url = 'https://api.github.com/gists';
		var params = {
			page: pages
		};
		url += '?' + urlStringify(params, i);
		
		xmlhttp.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200) {
					var listResults = JSON.parse(this.responseText);
					var arrayResults = [];
					var sizeArray = 0;
					for(var i = 0; i < listResults.length; i++) {
						arrayResults[sizeArray] = listResults[i];
						sizeArray++;
					}
					
					createGistList(arrayResults, document.getElementById(searchResults));
				}
			}	
		}
	}
	
	xmlhttp.open('GET', url, true);	
	xmlhttp.send(); 
}

function createGistList(gArray, gList) {
	var list = document.createElement('ul');
	list.documentElement('value = "Favorites"');

	
	for(var i = 0; i < gArray.length; i++) {
		var newLi = document.createElement('li');
		newLi.id = gArray[i].id;
		
		if(gArray[i].description == null || gArray[i].description == 0) {
			newLi.innerHTML += '<a href="' + gArray[i].html_url + '">' + 'No description provided' + '</a>   ';
		}
		else {
			newLi.innerHTML += '<a href="' + gArray[i].html_url + '">' + gArray[i].description + '</a>   ';
		}
		
		var faveButton = document.createElement("button");
		faveButton.innerHTML = "Favorite!";
		faveButton.setAttribute("gistId", gArray.id);
		
		faveButton.onclick = function() {
			var gistId = this.getAttribute("gistId");
			//var favored = findByID(gArray, gistId);
			for(var i = 0; i < gArray.length; i++) {
				if(gArray[i].id === gistId.value) {
					localStorage.setItem('gist', JSON.stringify(gArray[i]));
				}
			}
			//document.getElementById('searchResults').removeChild(document.getElementById(gistId.id));
			printFaveList(document.getElementById('favorites'));
		}
		
		list.appendChild(newLi);
		newLi.appendChild(faveButton);
		var elemGist = document.getElementById('searchResults');
		elemGist.appendChild(list);
	}
	return gList;
}

function printFaveList(faveList) {
	var list = document.createElement('ul');
	
	for(var key in localStorage) {
		var newLi = document.createElement('li');
		var faveItem = JSON.parse(localStorage.getItem(key));
		newLi.id = faveItem.id;
		
		if(faveItem.description == null || faveItem.description == 0) {
			newLi.innerHTML += '<a href="' + faveItem.html_url + '">' + 'No description provided' + '</a>   ';
		}
		else {
			newLi.innerHTML += '<a href="' + faveItem.html_url + '">' + faveItem.description + '</a>   ';
		}
		
		var unfavButton = document.createElement("button");
		unfavButton.innerHTML = "UnFavorite!";
		unfavButton.setAttribute("gistId", faveItem.id);
	
		unfavButton.onclick = function() {
			var gistId = this.getAttribute("gistId");
			//faveList.removeChild(document.getElementById(this.id));
			//document.getElementById('favorites').parentElement.removeChild(document.getElementById(gistId.id));
			printUnFaveList(document.getElementById(favorites));
		}
		
		list.appendChild(newLi);
		newLi.appendChild(unfavButton);
		var elemGist = document.getElementById('favorites');
		elemGist.appendChild(list);
		
	}
}


//URL Stringify from lecture code
function urlStringify(obj, i){
	var str = []
	for(var prop in obj){
		var s = encodeURIComponent(prop) + '=' + encodeURIComponent(i);
		str.push(s);
	}
	return str.join('&');
}

window.onload = function() {
	var faves = localStorage.getItem('favorites');
	if( faves === null ) {	//Favorites doesn't exist
		console.log("You have no favorites stored");
		faveObjects = {'faveList':[]};
		localStorage.setItem('favorites', JSON.stringify(faveObjects));

	}
	else {
		faveObjects = JSON.parse(localStorage.getItem('favorites'));
	}

//	createGistList();
}
