$(document).ready(function() {

  $("#error").hide().empty();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Fake data taken from initial-tweets.json
  function loadTweets() {
    $.ajax("/tweets", { method: "get" })
      .then((data) => renderTweets(data))
      .catch((err) => console.log("failed to load tweets: ", err));
  }
  //Implement a createTweetElement function
  const createTweetElement = function(tweet) {
    //Create hard coded tweets
    const $tweet = $(`<article>
          <header>
            <div class="tweetIcon">
              <img src= "${tweet.user.avatars}" alt="user icon">
              <p class="nameID">${tweet.user.name}</p>
            </div>
            <p class="handle">${tweet.user.handle}</p>
          </header>
          <div class="tweetDiv">
            <p class="tweet">${escape(tweet.content.text)}</p>
          </div>
          <footer>
              <p class="tweetDate">${timeago.format(tweet.created_at)}</p>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  $(function() {
    $("#tweetForm").on("submit", function(event) {
      $("#error").hide().empty();
      event.preventDefault();
      const data = $(this).serialize();
      const tweet = $(this).find("textarea").val();
      if (!tweet) {
        $("#error").append("🔺 Empty tweet. Please add some words to your tweet. 🔺").show();
      } else if (tweet.length > 140) {
        $("#error").append("🔺 Too Long. Please shorten your tweet to 140 characters. 🔺").show();
      } else {
        const formData = $(this).serialize();
        $.ajax("/tweets", {
          method: "post", data: data
        }).done(() => loadTweets(), $("#tweetForm").trigger("reset"), $(".counter").html(0)).fail((err) => console.log("Did not post data: ", err));
      }
    });
    loadTweets();
  });
});