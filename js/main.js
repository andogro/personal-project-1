// assign global variables
  var api_id = '5d0de430';
  var api_key = 'e854c40c98b9131e8685322b1db966c5';
  error_message = '<p>This machine is out of order. Please try again or come back later.</p>';

// Array of images that get appended to the boxImages div  
    function populateSlots() {
    var slotImages = ["images/beer.png", "images/bread.png", "images/broccoli.png", "images/burger.png", "images/carrot.png", "images/corn.png","images/eggplant.png", "images/fries.png", "images/grapefruit.png", "images/green_pea.png", "images/hotdog.png", "images/mushroom.png", "images/peach.png", "images/pear.png", "images/pepper.png", "images/pizza.png", "images/red_pepper.png", "images/sausage.png", "images/steak.png", "images/turkey.png", "images/wine.png"];
       for (i=0; i<slotImages.length; i++) {
       var rand = Math.floor((Math.random() * (slotImages.length -1)) + 1);
        for (j=1; j<4; j++) {
        rand = Math.floor((Math.random() * (slotImages.length -1)) + 1);
       $('.boxImage'+j).append('<img src ='+slotImages[rand]+'>');
       }
      }
    };

//function that runs through images and fades in recipe, clears div each time
  function animateSlots() {
    for (i=1; i<4; i++) {
     $(".tb"+i).empty();
     $(".boxImage"+i).empty()
     .css("margin-top", "0px")
     .show().animate({marginTop: "-2070px"}, 3000)
     .fadeOut(1000, function() {
     $(".textBelow").fadeIn(1000);
        });
      }
    };

