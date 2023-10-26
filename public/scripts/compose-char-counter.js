$(document).ready(function() {
//Event listener for when a character is inputted into the text area
  $('#tweet-text').on('input', function() {
    if (this.value.length <= 140) {
      $(".counter").html(140 - this.value.length);
      $(".counter").css("color", "#545149");
    } else {
      $(".counter").html("-" + (this.value.length - 140));
      $(".counter").css("color", "red");
    }
  });
});

