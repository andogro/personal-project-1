// add scripts
$(document).on('ready', function() {
  console.log('sanity check!');
 
// assign global variables
  var api_id = '5d0de430';
  var api_key = 'e854c40c98b9131e8685322b1db966c5';

  // populateSlots();  

// Array of images that get appended to the boxImages div  
function populateSlots() {
  var slotImages = ["images/beer.png", "images/bread.png", "images/broccoli.png", "images/burger.png", "images/carrot.png", "images/corn.png","images/eggplant.png", "images/fries.png", "images/grapefruit.png", "images/green_pea.png", "images/hotdog.png", "images/mushroom.png", "images/peach.png", "images/pear.png", "images/pepper.png", "images/pizza.png", "images/red_pepper.png", "images/sausage.png", "images/steak.png", "images/turkey.png", "images/wine.png"];
     for (i=0; i<slotImages.length; i++) {
     var rand = Math.floor((Math.random() * (slotImages.length -1)) + 1);
     console.log(rand);
     $('.boxImage1').append('<img src ='+slotImages[rand]+'>');
     var rand = Math.floor((Math.random() * (slotImages.length -1)) + 1);
     console.log(rand);
     $('.boxImage2').append('<img src ='+slotImages[rand]+'>');
     var rand = Math.floor((Math.random() * (slotImages.length -1)) + 1);
     console.log(rand);
     $('.boxImage3').append('<img src ='+slotImages[rand]+'>');
    }
  };

//function that runs through images and fades in recipe
function animateSlots() {
  for (i=1; i<4; i++) {
   $( ".boxImage"+i ).animate({marginTop: "-2070px"}, 3000);
   $(".boxImage"+i).fadeOut(1000, function() {
   $(".textBelow").fadeIn(1000);
      });
    }
  };


//main event listener for program

$(".spinner").on('click', function() {
  
  populateSlots();  
  animateSlots();
  var choice = $(".recipeChoice").val();
  var restrictions = $(".recipeRestrictions").val(); 
  var responseType = $(".recipeTime").val();
  var url = 'http://api.yummly.com/v1/api/recipes?_app_id='+api_id+'&_app_key='+api_key+'&q=Main%20Dishes&allowedCuisine%5B%5D=cuisine%5Ecuisine-'+choice+restrictions+'&requirePictures=true';
  
  // append 3 images from api to each of the ending divs (in the last span with link as well)

  //  need some sort of reset on click - probably just empty the div before populating

  //  need some sort of reset on click

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "dataType": "jsonp"
    };


  $.ajax(settings).done(function (response) {
  var attributes = response.attribution.html;
  $(".atts").remove();
  $("#attribution").show("slow").append('<p class = "atts">'+attributes+'</p>');
  
  var maxResults = response.totalMatchCount;
  var randomResult = Math.floor((Math.random() * maxResults) + 1);
  var newURL = url + '&maxResult=1&start='+ randomResult;

  $.get(newURL).done(function(res) {
        console.log(res);
        var link = res.matches[0].id;
        var recipe1 = '<br><a href ="http://www.yummly.com/recipe/'+link+'">'+res.matches[0].recipeName+'</a>';
        var image1 = '<a href ="http://www.yummly.com/recipe/'+link+'"><img src = "'+res.matches[0].smallImageUrls[0]+'">';
        console.log(image1);
        $('.tb1').append(image1,recipe1);
      });
    
    });
  });
});




// for(var key in attributes) {
//     var attributesValue = attributes[key];
//    
// }

//Appending to Dom 

