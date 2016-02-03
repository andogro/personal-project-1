$(document).on('ready', function() {
  console.log('sanity check!');
   });

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
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>");// handle errors
            });
           }).fail(function(error3){
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>");// handle errors
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
              $('.error').show().append("<p>This machine is out of order. Please try again or come back later.</p>");// handle errors
           });
 });
