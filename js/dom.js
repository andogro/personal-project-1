$(document).on('ready', function() {
  console.log('sanity check!');
   });

//main event listener for program - all functionality resides here
  $(".spinner").on('click', function() {
    var choice = $(".recipeChoice").val();
    var restrictions = $(".recipeRestrictions").val(); 
    var time = $(".recipeTime").val(); 
    var courses = [ "Appetizers","Main%20Dishes", "Desserts",];
    
    animateSlots();
    populateSlots(); 
    
    var url1 = 'http://api.yummly.com/v1/api/recipes?_app_id='+api_id+'&_app_key='+api_key+'&q='+courses[0]+'&allowedCuisine%5B%5D=cuisine%5Ecuisine-'+choice+restrictions+time+'&requirePictures=true';

       $.get(url1).done(function(response1) { 
           var maxResults = response1.totalMatchCount;
           var randomResult = Math.floor((Math.random() * (maxResults-1) ) + 1);
           var newURL = url1 + '&maxResult=1&start='+ randomResult;
           console.log("newURL:"+newURL);
           if(maxResults === 0) {
            $('.tb'+i).append("<img src=images/no_result.png>");
           }
          requestRecipe(newURL, i);
        });
       
      function requestRecipe(url, index) {
       $.get(newURL).done(function(res) {          
          var initialLink = res.matches[0].id;
          console.log("Initial LInk:"+initialLink);
          var recipeURL = 'http://api.yummly.com/v1/api/recipe/'+initialLink+'?_app_id='+api_id+'&_app_key='+api_key; 
            $.get(recipeURL).done(function(res2) {
               var recipeLink = res2.source.sourceRecipeUrl;
               var recipeName = res2.name;
               var recipeImg = res2.images[0].hostedSmallUrl;
               var recipe = '<br><a href ="'+recipeLink+'" target="_blank">'+recipeName+'</a>';
               var image = '<a href ="'+recipeLink+'"><img src = "'+recipeImg+'">';       
              $('.tb'+index).append(image,recipe);
             });
           });
         }

      function setAttributes() {
        var attributes = response.attribution.html;
        $(".atts").remove();
        $("#attribution").show(1000).append('<p class = "atts">'+attributes+'</p>');
        }
      }
  });

