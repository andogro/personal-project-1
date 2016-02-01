// add scripts
$(document).on('ready', function() {
  console.log('sanity check!');

  var api_id = '5d0de430';
  var api_key = 'e854c40c98b9131e8685322b1db966c5';

  $("#attribution").hide();


$(".spinner").on('click', function() {
  var choice = $("#recipeChoice").val();
  var restrictions = $("#recipeRestrictions").val();
  var responseType = $("#recipeTime").val();
  var url = 'http://api.yummly.com/v1/api/recipes?_app_id='+api_id+'&_app_key='+api_key+'&q=Main%20Dishes&allowedCuisine%5B%5D=cuisine%5Ecuisine-'+choice+'&allowedDiet%5B%5D='+restrictions+'&requirePictures=true';

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "dataType": "jsonp"
    };

  $.ajax(settings).done(function (response) {
  console.log(response);
  var attributes = response.attribution.html;
  $(".atts").remove();
  $("#attribution").show("slow").append('<p class = "atts">'+attributes+'</p>');
  });




  


// for(var key in attributes) {
//     var attributesValue = attributes[key];
//    
// }


 // var ArrayofInfo = [];
  // var artistInfo = response.results;
  // var getTrackName = artistInfo.map(function(obj) {
  //     ArrayofInfo.push(obj.trackName);
  //     ArrayofInfo.push(obj.previewUrl);
  //     ArrayofInfo.push(obj.artworkUrl100);
  //     return ArrayofInfo;
    // });

//Appending to Dom 


 });
});