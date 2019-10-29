
var cusineType = $("#cusine-input").val() || "asian";
var queryURL = "https://api.edamam.com/search?q=" + cusineType + "&app_id=$ae6bf7b0&app_key=$f2c047350509b09ed7dc98cd15dd86d1—"
    ;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    $("#recipe-view").text(JSON.stringify(response));
    console.log(response);

});