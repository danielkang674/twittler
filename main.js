
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
        $tweet.text(`@ ${tweet.user}: ${tweet.message}`);
        this.$tweetArea.prepend($tweet);
      });
    },
    seeNewTweets(){
      this.$seeNewTweetsBtn.on("click", function(){
        view.render();
      });
      this.$seeNewTweetsBtn.appendTo(this.$body);
    }
  }

  controller.init();
});