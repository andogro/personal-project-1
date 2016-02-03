$(document).on('ready', function() {
  console.log('sanity check!');
   });

// assign global variables
  var api_id = '5d0de430';
  var api_key = 'e854c40c98b9131e8685322b1db966c5';

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
     $(".boxImage"+i).empty().css("margin-top", "0px").show().animate({marginTop: "-2070px"}, 3000).fadeOut(1000, function() {
     $(".textBelow").fadeIn(1000);
        });
      }
    };

//main event listener for program - all functionality resides here
  $(".spinner").on('click', function() {
    var choice = $(".recipeChoice").val();
    var restrictions = $(".recipeRestrictions").val(); 
    var time = $(".recipeTime").val();
    var url = 'http://api.yummly.com/v1/api/recipes?_app_id='+api_id+'&_app_key='+api_key+'&q=Main%20Dishes&allowedCuisine%5B%5D=cuisine%5Ecuisine-'+choice+restrictions+time+'&requirePictures=true';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "dataType": "jsonp"
      };

   //ajax done function 
    $.ajax(settings).done(function (response) {
        setAttributes();
        animateSlots();
        populateSlots();  
        randomURL(url);

       //set attributes to the bottom of the page
        function setAttributes() {
        var attributes = response.attribution.html;
        $(".atts").remove();
        $("#attribution").show(1000).append('<p class = "atts">'+attributes+'</p>');
        }
       
    // append 3 images from api to each of the ending divs (in last span with link)
        function requestRecipe (url, index) {
        $.get(url).done(function(res) {          
          var initialLink = res.matches[0].id;
          var recipeURL = 'http://api.yummly.com/v1/api/recipe/'+initialLink+'?_app_id='+api_id+'&_app_key='+api_key; 
            $.get(recipeURL).done(function(res2) {
               var recipeLink = res2.source.sourceRecipeUrl;
               var recipeName = res2.name;
               var recipeImg = res2.images[0].hostedSmallUrl;
               var recipe = '<br><a href ="'+recipeLink+'" target="_blank">'+recipeName+'</a>';
               var image = '<a href ="'+recipeLink+'"><img src = "'+recipeImg+'">';       
              $('.tb'+index).append(image,recipe);
             }).fail(function(error2){
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>")// handle errors
            });
           }).fail(function(error3){
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>")// handle errors
           });
         }
    
    // get a randomUrl to be passed into the request recipe 
        function randomURL(url) {
        for (i=1; i<4; i++) {
           var maxResults = response.totalMatchCount;
           if(maxResults === 0) {
            $('.tb'+i).append("<img src=images/no_result.png>");
           }
           var randomResult = Math.floor((Math.random() * (maxResults-1) ) + 1);
           var newURL = url + '&maxResult=1&start='+ randomResult;
           requestRecipe(newURL, i);
          }
        }  
    }).fail(function(error1){
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>")// handle errors
           });
 });
