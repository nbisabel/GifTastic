var officeCharacters = ["Dwight", "Michael Scott", "Jim", "Pam"];

   $(document).ready(function() {
       for (var i = 0; i < officeCharacters.length; i++) {
           $("office-character-buttons").append("<button type='button' onclick='searchGif(\"" + officeCharacters[i] + "\")' class='btn btn-primary' value=' " + officeCharacters[i] + "'>" + officeCharacters[i] + "</button>");
       }
   });
    function officeCharactersButtonClicked() {
        var userInput = $('#officeCharacterInput').val();
        searchGif(userInput);
    }
    function submitButtonClicked() {
        var userInput = $('#officeCharacterInput').val();

        if(userInput) {
            $('#office-character-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'>" + userInput + "</button>");
        }
    }

    function searchGif(gifName) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=L0vRtosRs8jHqdOOMCNEyqP5ufsOc091"
        $.ajax({
            url: queryURL,
            method: "GET",
        })
        .then(function (response) {
            displayGif(response);
        })

    }
    function displayGif(response) {
        $("#gifs-here").empty();
        for (var i = 0; i < response.data.length; i++) {
            var rating = "<div class='ratings'> Rating: " + (response.data[i].rating) + "</div>";
            var image = rating + "<img src=" + response.data[i].images.fixed_height_still.url + 
                '"data-still="' + response.data[i].images.fixed_height_still.url + 
                '" data-animate="' + response.data[i].images.fixed_height.url + ' "data-state="still" class="gif" style= "width:250px; height:250px">';
            image = '<div class="col-md-4">' + image + "</div>";
            $("#gifs-here").append(image);
        }
        $('.movimage').on('click', function() {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).attr("data-animate"));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr("data-still"));
                $(this).attr('data-state', 'still');

            }
        });
    }   