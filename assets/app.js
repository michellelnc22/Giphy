//Declaring an array of animals
var cuteAnimals = ["puppies", "kittens", "birds", "bunnies"];

//Displays the buttons
function displayButtons() {
    //Clears out the old buttons before adding new ones
    $(".buttons-area").empty();
    //Loops through the array of animals
    for (var i = 0; i < cuteAnimals.length; i++) {
        //Generates a button
        var button = $("<button>");
        //Adds a class
        button.addClass("animal");
        //Adding some CSS
        button.addClass("btn btn-primary");
        //Adding a data attribute with a value
        button.attr("data-name", cuteAnimals[i]);
        //Adds the animals name to the button
        button.text(cuteAnimals[i]);
        //Appends buttons to the HTML
        $(".buttons-area").append(button);

    }
}

//Adds a new button
function addButton() {
    $("#add-animal").on("click", function () {
        event.preventDefault();
        //Grabs text from the input box
        var animal = $("#animal-input").val().trim();
        //Pushes the animal from the input box to the array
        cuteAnimals.push(animal);
        //Displays the new button
        displayButtons();

    })
}

//Displays the Gifs
function showGifs() {

    //Performs an AJAX request
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=g&api_key=xs7qsbh1QXP6u1Jc2Cf6C9TvlfazEI62";

    $.ajax({
        url: queryURL,
        method: "GET",
    })

        //Gets the data from the request
        .then(function (response) {
            var results = response.data;
            console.log(response);

            //Looking through the results
            for (var i = 0; i < results.length; i++) {

                //Creates a new div 
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                //Creates a new image 
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif");
                //Appends the gifs to the new div 
                gifDiv.append(gifImage);
                $("#gif-space").prepend(gifDiv);


            }

        })


}

//Displays the buttons I've already created
displayButtons();
//Allows the user to add an animal
addButton();
//Allows the user to pause the Gifs
$(document).on("click", ".animal", showGifs);

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });; 