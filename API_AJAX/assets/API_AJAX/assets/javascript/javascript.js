$( document ).ready(function() {

    var topics = ["Cat", "Dog", "Elephant", "Zebra", "Skunk", "Monkey", "Donkey", "Horse", "Fox", "Bunny", "Fish", "Unicorn", "Giraffe"];

    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < topicss.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("topics");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topicss[i]);
            gifButton.text(topicss[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    function addNewButton(){
        $("#addGif").on("click", function(){
        var topics = $("#topics-input").val().trim();
        if (topics == ""){
          return false; 
        }
        topicss.push(topics);
    
        displayGifButtons();
        return false;
        });
    }
    
    }
    function removeLastButton(){
        $("removeGif").on("click", function(){
        topics.pop(topics);
        displayGifButtons();
        return false;
        });
    }
    

    function displayGifs(){
        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "ZUQAS9M3AYe1HDMrVXmKojxj8O6ScWia";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data;
            if (results == ""){
              alert("There are no gifs for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    $(document).on("click", ".topics", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });