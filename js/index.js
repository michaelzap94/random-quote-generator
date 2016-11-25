$(document).ready(function () {
    var randomNumber = function () {
        var rgbArray = [];
        for (var i = 0; i < 3; i++) {
            var x = Math.random(); //random number
            x = 255 * x; //if we want "say" a random number 0-255
            x = Math.round(x);//////  rounds a number;
            rgbArray.push(x);
        }

        return rgbArray;
    }

    var arrRandom = function () {
        var rgbArrayRandomGenerator = randomNumber();

        var rgbColor = "rgb(" + rgbArrayRandomGenerator[0] + ", " + rgbArrayRandomGenerator[1] + ", " + rgbArrayRandomGenerator[2] + ")";

        return rgbColor;
    }

    var newQuoteBtn = $("#newQuoteBtn");

    function sendAJAX() {


//TO ANIMATE COLORS IMPORT THE JQUERY UI PLUGIN
        var randomColor = arrRandom();
        $("body").animate({backgroundColor:randomColor},900);
        newQuoteBtn.animate({color:randomColor},900);
////////////////////////////////////////////////
        $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?", function(a) {


            var twitQuot = 'https://twitter.com/intent/tweet?text=';

            $("#twitter").attr("href", twitQuot+encodeURIComponent(a.quoteText + "\n"+' -Author: ' + a.quoteAuthor));

            $("#textQuote").animate({
                    opacity: 0.1
                }, 450,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 450);
                    $(this).text(a.quoteText);
                });

            $("#authorQuote").animate({
                    opacity: 0.1
                }, 450,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 450);

                    if(a.quoteAuthor!=="") {
                        $("#authorQuote").html("-" + a.quoteAuthor);
                    }
                    else{
                        $("#authorQuote").html("-" + "Anonymous");

                    }

                });

        });




    }

    (sendAJAX())
    newQuoteBtn.on("click", function () {
        sendAJAX();





    });


});