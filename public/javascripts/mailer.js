var reset = $("#email_template").val()
var saved;
$("#edit").toggle();


//Show what it will look like in HTML
$('#preview').on('click', function (e) {
    e.stopPropagation();

    var pageData = getPageData();
    var template = _.template($("#email_template").val());

    saved = $("#email_template").val();
    $("#email_container").html(template(pageData));
    $("#preview").toggle();
    $("#edit").toggle();

});

$("#edit").on('click', function(e) {
    e.stopPropagation();

    var newTextArea = $('<textarea class="emailer" id="email_template">');
    newTextArea.html(saved);
    $("#email_container").html(newTextArea);
    $("#preview").toggle();
    $("#edit").toggle();

})



$('#send').on('click', function(e) {
    e.stopPropagation();
    // create a new instance of the Mandrill class with your API key
    var m = new mandrill.Mandrill('zA-UIXS6JFDaYdo5SGNAaw');


    //Get from and to
    var from = $('#from').val();
    var to = "liz@tradecrafted.com";

    //Get Page Data
    var pageData = getPageData();
    var template = _.template($("#email_template").val())


    // create a variable for the API call parameters
    var params = {
        "message": {
            "from_email":from,
            "to":[{"email":to}],
            "subject": pageData.subject,
            "html": template(pageData)
        },
        autotext: true,
        track_opens : true,
        track_clicks : true
    };
    sendTheMail(params, m);
})



function sendTheMail(params, m) {
// Send the email!

    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}

// Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

function getPageData () {
    return {
        "title": $('#title').html(),
        "subject": $('#title').html() + " Curriculum",
        "prework" : $(".prework").html(),
        "primary" : _.pluck(_.where($('.curriculum li'), {className: "text-primary"}),"innerHTML").join("<br>"),
        "warning" : _.pluck(_.where($('.curriculum li'), {className: "text-warning"}),"innerHTML").join("<br>"),
        "success" : _.pluck(_.where($('.curriculum li'), {className: "text-success"}),"innerHTML").join("<br>"),
        "main" : $('.main').html(),
        "stretch" : $('.stretch').html(),
        "resources" : $('.tutorials').html()
    }
}

