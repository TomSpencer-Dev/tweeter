$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    if (this.value.length <= 140) {
      $(".counter").html(this.value.length);
      $(".counter").css("color", "#545149");
    } else {
      $(".counter").html("-" + (this.value.length - 140) );
      $(".counter").css("color", "red");
    }
  });
});

