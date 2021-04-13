
//listen for form submit
$("#myForm").submit(function(e){
	//pprevent form from submitting
	e.preventDefault();
	//Get form values
	var siteName = $("#siteName").val();
	var siteUrl = $("#siteUrl").val();

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}
		
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if(localStorage.getItem("bookmarks") === null){
		//init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//set to localStorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	} else {
		//GET BOOKMARKS FROM LOCAL STORAGE
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		//add bookmark to array
		bookmarks.push(bookmark);
		//Re-set back to localstorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	//Empty form values
	var siteName = $("#siteName").val("");
	var siteUrl = $("#siteUrl").val("");

	//refetch bookmarks
	fetchBookmarks();	
});

//delete bookmark
function deleteBookmark(url){
	//get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	//loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url){
			//remove from arrray
			bookmarks.splice(i, 1);
		}
	}
	//Re-set back to localstorage
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	//refetch bookmarks
	fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
	//get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	//Check if bookmark is empty
	var bookmarksResults = $("#bookmarksResult").text("");
	if(bookmarks.length == 0){
		$("#bookmarksResult").append("<h3>Bookmark empty</h3>");
	}else{
		//get output id	
		for (var i = 0; i < bookmarks.length;  i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			$("#bookmarksResult").append( 
				`<div class"well"> 
					<h3>${name}
					<a class="btn btn-default" target="_blank" href="${url}">Visit</a>
					<a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a>
					</h3>
				</div>`
			);
		}
	}
 }

 function validateForm(siteName, siteUrl){
 	if (!siteName || !siteUrl) {
		alert("Please Fill The Form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert("Please use a valid URL");
		return false;
	}

	return true
 }
