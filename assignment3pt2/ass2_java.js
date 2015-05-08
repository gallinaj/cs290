
var gistList = [];
var xmlHttp = createXmlHttpRequestObject();

/*Function to create request object and check browser type.
Sourced from Bucky's Room lectures https://www.thenewboston.com/videos.php?cat=61&video=19325 */
function createXmlHttpRequestObject() {
	
	//Checks version of browser
	if(window.XMLHttpRequest) {		//For Mozilla, Safari, IE7+
		xmlHttp = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {		//For IE6 and older
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(!xmlHttp){
		alert ('Unable to create HTTPRequest.');
	}
	else {
		return xmlHttp;
	}
}

/*Function called from HTML file to begin the search.
Sourced from https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started */
function fetchGists() {
	/*Do the XMLHttpRequest here and keep the result in the originalGistList
	When you get the data, you need to iterate over them and call the function 
	from the next step inside it per gist to generate the html content (generateGistHtml)*/

	var req = xmlHttp;
	
	//Checks if the number of pages entered is in range
	var pages = document.getElementsByName('pageNumber')[0].value;
	if(pages > 5) {
		pages = 5;
		alert('Invalid entry; returning 5 pages.');
	}
	else if(pages < 1) {
		pages = 1;
		alert('Invalid entry; returning 1 page.');
	}
	
	//Loop through number of pages
	for (var i = 0; i < pages; ++i) {
		var url = 'https://api.github.com/gists';
		var params = {
			page: pages
		};
		url += '?' + urlStringify(params, i);
		
		req.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200) {
					var listResults = JSON.parse(this.responseText);
					var arrayResults = [];
					var sizeArray = 0;
/*					for(var i = 0; i < listResults.length; i++) {
						arrayResults[sizeArray] = listResults[i];
						sizeArray++;
					}*/
					
					arrayResults = listResults;
					gistList = arrayResults;
					
					createGistList(gistList, document.getElementById('searchResults'));
				}
			}
		}
		req.open('GET', url);
		req.send();	
	}
}
	
//URL Stringify from lecture code
function urlStringify(obj){
	var str = []
	for(var prop in obj){
		var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
		str.push(s);
	}
	return str.join('&');
}
	debugger;
function createGistList(resultArray, resultList) {
	
	/*gist will have the entire gist data that comes from the api, for 
	the details check my pinned discussion about understanding JSON
	
	Add a button (code above goes here) next to each element and save 
	the gist id in the html to be able to find it again, if you chose 
	id, you need a function called findById(id) that takes a gist id 
	and iterates over originalGistList to find the appropriate gist 
	and returns it.
	
	This function will be used in the previous step function (fetchGists)*/
	
	var newUl = document.createElement('ul');
	
	for(var i = 0; i < resultArray.length; i++) {
		newUl.id = resultArray[i].id;
		
		if(resultArray[i].description == null || resultArray[i].description == 0) {
			newUl.innerHTML += '<a href="' +
				resultArray[i].html_url + '">' + 'No description provided' + '</a>';
		}
		else {
			newUl.innerHTML += '<a href="' +
				resultArray[i].html_url + '">' + resultArray[i].description + '</a>';		
		}
	}
	
	var faveButton = document.createElement("button");
	faveButton.innerHTML = "Favorite!";
	faveButton.setAttribute("gistId", resultArray.id);

	faveButton.onclick = function(){
		var gistId = this.getAttribute("gistId"); //this is what you have saved before
		var toBeFavoredGist = findById(gistId);
		
		/*here you add the gist to your favorites list in the localStorage and remove it from the gist list 
		and add it to favorites list*/
	}
	list.appendChild(newUl);
	newUl.appendChild(faveButton);
	
	return resultList;
}

function findById(id) {
	//iterate over list of gists to find the gist with id equals to input id
	//return that gist
	
	for(var i = 0; i < arrayResults.length; i++) {
		if(gistList[i].id == id.id) {
			localStorage.setItem(id.id, JSON.stringify(gistList[i].id));
			break;
		}
	}
	document.getElementById('searchResults'.removeChild(document.getElementById(id.id)));
	printFaveList(document.getElementById(favorites));
}	

function printFaveList(list) {
	
	for(var key in localStorage) {
		var newUl = document.createElement('ul');
		var fList = JSON.parse(localStorage.getItem(key));
		newUl.id = fList.id;
	
		
		if(fList[i].description == null || fList[i].description == 0) {
			newUl.innerHTML += '<a href="' +
				fList[i].html_url + '">' + 'No description provided' + '</a>';
		}
		else {
			newUl.innerHTML += '<a href="' +
				fList[i].html_url + '">' + fList[i].description + '</a>';		

		}
	
		var unfaveButton = document.createElement("button");
		unfaveButton.innerHTML = "Unfavorite!";
		unfaveButton.setAttribute("ungistId", fList.id);

		unfaveButton.onclick = function() {
			document.getElementById('favorites').removeChild();
		
		/*here you add the gist to your favorites list in the localStorage and remove it from the gist list 
		and add it to favorites list*/
		}
	list.appendChild(newUl);
	newUl.appendChild(unfaveButton);
	
	}
}

window.onload = function() {
	var faves = localStorage.getItem('favorites');
	if( faves === null ) {	//Favorites doesn't exist
		faveObjects = {'faveList':[]};
		localStorage.setItem('favorites', JSON.stringify(faveObjects));
	}
	else {
		faveObjects = JSON.parse(localStorage.getItem('favorites'));
	}

	createGistList();
}