
$(document).ready(function(){

  const model = {streams: streams, users: users};

  const controller = {
    init(){
      view.init();
    },
    getAllTweets(){
      return model.streams.home;
    }
  };

  const view = {
    init(){
      this.$body = $('body');
      this.allTweets = controller.getAllTweets();
      this.$seeNewTweetsBtn = $('<button>See new tweets</button>');
      this.$tweetArea = $('<div></div>');
      this.render();
    },
    render(){
      this.$body.html('');
      this.seeNewTweets();
      this.showAllTweets();
    },
    showAllTweets(){
      this.$tweetArea.appendTo(this.$body);
      this.allTweets.forEach((tweet)=>{
        let $tweet = $('<div></div>');
        $tweet.html(`@ ${tweet.user}: ${tweet.message} - <i>${timeSince(tweet.created_at)} ago</i>`);
        this.$tweetArea.prepend($tweet);
      });
    },
    seeNewTweets(){
      this.$seeNewTweetsBtn.on("click", function(){
        view.init();
      });
      this.$seeNewTweetsBtn.appendTo(this.$body);
    }
  }

  function timeSince(date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
  
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
  
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
  
    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }
  
    return interval + ' ' + intervalType;
  };

  controller.init();
});