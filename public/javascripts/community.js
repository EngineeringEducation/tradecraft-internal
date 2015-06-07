$(".up").on('click', function(e) {
	var el = this;
	var classes = $(el).attr("class").split(" ");
	//Loop through, find the one that starts with up_
	var id = false;
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].indexOf("up_") != -1) {
			//get ID of post
			id = classes[i].split("_")[1];
		}
	}
	//If we didn't find the ID for some reason, it's fine, the post will just throw an error.
	var url = "/community/" + id + "/vote";
	$.post(url, {vote: true})
	.done(function(response) {
		$(el).addClass("text-primary");
		$(".count_" + id).addClass("text-primary").removeClass("text-danger").html(response.votes);
		$(".down_" + id).removeClass("text-danger");
	})
	.fail(function(response) {
		console.log(response.responseText);
	});
});

//#TODO Basically a repeat of above - factor this out one day
$(".down").on('click', function(e) {
	var el = this;
	var classes = $(el).attr("class").split(" ");
	//Loop through, find the one that starts with up_
	var id = false;
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].indexOf("down_") != -1) {
			//get ID of post
			id = classes[i].split("_")[1];
		}
	}
	//If we didn't find the ID for some reason, it's fine, the post will just throw an error.
	var url = "/community/" + id + "/vote";
	$.post(url, {vote: false})
	.done(function(response) {
		$(el).addClass("text-danger");
		$(".count_" + id).addClass("text-danger").removeClass("text-primary").html(response.votes);
		$(".up_" + id).removeClass("text-primary");
	})
	.fail(function(response) {
		console.log(response.responseText);
	});
});



$('#career_link').addClass("active");
$('#author').toggle();
$('#is_self').on('click', function(e) {
	$('#author').toggle();
});

$('#tweet_new_option').on('click', function() {
	$("#tweet_data").attr("placeholder", "bit.ly/awesomeTC h/t @tradecraft #killingit");
});

$('#tweet_link_option').on('click', function() {
	$("#tweet_data").attr("placeholder", "https://twitter.com/lizthedeveloper/status/555493314388955137");
});

$('#fb_new_option').on('click', function() {
	$("#fb_data").attr("placeholder", "Tradecraft killing it again with this awesome post. Gotta love this great content!");
});

$('#fb_link_option').on('click', function() {
	$("#fb_data").attr("placeholder", "A facebook share link goes here");
});