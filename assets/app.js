var cuteAnimals = ["puppies", "kittens", "birds", "bunnies"]; 

function displayButtons() {
$(".buttons-area").empty(); 
for (var i = 0; i < cuteAnimals.length; i++) {
    var button = $("<button>"); 
    button.addClass("animal"); 
    button.addClass("btn btn-primary"); 
    button.attr("data-name", cuteAnimals[i]); 
    button.text(cuteAnimals[i]); 
    $(".buttons-area").append(button); 

}
}

function addButton() {
    $("#add-animal").on("click", function() {
        event.preventDefault(); 
        var animal = $("#animal-input").val().trim(); 
        cuteAnimals.push(animal); 
        displayButtons(); 

    })
}

function showGifs() {
    var animal = $(this).attr("data-name"); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=g&api_key=xs7qsbh1QXP6u1Jc2Cf6C9TvlfazEI62"; 
    
    $.ajax({
    url: queryURL, 
    method: "GET", 
    })

    .then(function(response) {
        var results = response.data; 
        console.log(response); 
       
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv"); 
            var gifImage = $("<img>"); 
            gifImage.attr("src", results[i].images.fixed_height.url); 
            gifImage.attr("data-still", results[i].images.fixed_height.url); 
            gifImage.attr("data-animate", results[i].images.fixed_height.url); 
            gifImage.attr("data-state", "animate"); 
            gifImage.addClass("gif"); 
            gifDiv.append(gifImage); 
            $("#gif-space").prepend(gifDiv); 


        }

    })


}

displayButtons(); 
addButton(); 
$(document).on("click", ".animal", showGifs); 
$(document).on("click", ".gif", function() {
var state = $(this).attr("data-state"); 
if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still")); 
    $(this).attr("data-state", "still"); 
} else {
    $(this).attr("src", $(this).attr("data-animate")); 
    $(this).attr("data-state", "animate"); 
}
})