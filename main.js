
$(document).ready(function(){

  const model = {streams: streams, users: users};

  const controller = {
    init(){
      view.init();
    },
    getAllTweets(){
      return model.streams.home;
    },
    getUserTweets(user){
      return model.streams.users[user]
    },
    getUsers(){
      return model.users;
    }
  };

  const view = {
    init(){
      this.$body = $('body');
      this.allTweets = controller.getAllTweets();
      this.$seeNewTweetsBtn = $('<button>See new tweets</button>');
      this.$tweetArea = $('<div class="tweet-area"></div>');
      this.allUsers = controller.getUsers();
      this.render();
    },
    render(){
      this.$body.html('');
      this.seeNewTweets();
      this.showAllTweets();
    },
    showAllTweets(){
      this.$tweetArea.appendTo(this.$body);
      for(let tweet of this.allTweets){
        let $tweet = $(`<div></div>`);
        $tweet.html(`<a href="#" class="${tweet.user}">@${tweet.user}</a>: ${tweet.message} - <i>${timeSince(tweet.created_at)} ago</i>`);
        // $(`.${tweet.user}`).click(function(){
        //   view.seeUserTweets(tweet.user);
        // });
        $tweet.prependTo(this.$tweetArea);
      }
      for(let user of this.allUsers){
        $(`.${user}`).click(function(){
          view.seeUserTweets(user);
        });
      }
    },
    seeNewTweets(){
      this.$seeNewTweetsBtn.on("click", function(){
        view.init();
      });
      this.$seeNewTweetsBtn.appendTo(this.$body);
    },
    seeUserTweets(user){
      this.$body.html('');
      view.seeNewTweets();
      let userTweets = $('<div></div>');
      userTweets.appendTo(this.$body);
      let tweets = controller.getUserTweets(user);
      for(let tweet of tweets){
        let $tweet = $(`<div></div>`);
        $tweet.html(`: ${tweet.message} - <i>${timeSince(tweet.created_at)} ago</i>`);
        $tweet.prepend(`<a href="#" class="${tweet.user}">@${tweet.user}</a>`);
        $(`.${tweet.user}`).click(function(){
          view.seeUserTweets(tweet.user);
        });
        $tweet.prependTo(userTweets);
      }
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