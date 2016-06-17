const TweetCompose = function(el) {
  this.$el = $(el);
  this.$el.on("submit", this.handleSubmit.bind(this));
};

TweetCompose.prototype.handleSubmit = function() {
  this.submitTweet();
};

TweetCompose.prototype.submitTweet = function () {
  let tweetCompSerial = this.$tweetCompose.serializeJSON();
  let $input = this.$el.find("input");

  this.$tweetCompose.prop("disabled", true);
  let content = this.$el[0][1].value;

  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    data: {
      content: content,
      mentioned_user_ids: "fill in user ids"
    },
    success: this.successFunct.bind(this),
  });

};

TweetCompose.prototype.successFunct = function(data) {
  this.$tweetCompose.prop("disabled", false);
};

module.exports = TweetCompose;
