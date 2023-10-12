$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    if (this.value.length <= 140) {
      $(".counter").html(this.value.length);
    } else {
      $(".counter").html("-" + (this.value.length - 140) );
      $(".counter").css("color", "red");
    }
  });
});

