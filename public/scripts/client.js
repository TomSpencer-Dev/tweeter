$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  function loadTweets() {
    $.ajax("/tweets", { method: "get" })
      .then((data) => renderTweets(data))
      .catch((err) => console.log("failed to load tweets: ", err));
  };
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
            <p class="tweet">${tweet.content.text}</p>
          </div>
          <footer>
            <div>
              <p id="tweetDate">${timeago.format(tweet.created_at)}</p>
            </div>
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
      event.preventDefault();
      const data = $(this).serialize();
      const tweet = $(this).find("textarea").val();
      if (!tweet) {
        alert("There is no tweet content");
      } else if (tweet.length > 140) {
        alert("Your tweet is too long!");
      } else {
        const formData = $(this).serialize();
        $.ajax("/tweets", {
          method: "post", data: data
        }).done(() => loadTweets(), $("#tweetForm").trigger("reset")).fail((err) => console.log("Did not post data: ", err));
      }
    });
    loadTweets();
  });
});