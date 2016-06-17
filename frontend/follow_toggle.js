const FollowToggle = function (el, options) {
  this.$el = $(el);
  let fbutton = this.$el.data("fbutton");
  this.userId = fbutton["id"] || options.userId;
  this.followState = fbutton["follow-state"] || options.followState;

  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

FollowToggle.prototype.render = function() {
  console.log(this);

  this.$el.empty();
  if (this.followState === "followed") {
    this.$el.attr("value", "Unfollow!");
    this.$el.prop("disabled", false);
  } else if (this.followState === "unfollowed") {
    this.$el.attr("value", "Follow!");
    this.$el.prop("disabled", false);
  } else {
    this.$el.prop("disabled", true);
  }

};

FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();

  const $button = $(event.currentTarget);
  let type = (this.followState === "unfollowed" ? "POST" : "DELETE");
  $button.prop("disabled", true);

  if (this.followState === "followed") {
    this.$el.attr("value", "Unfollowing...");
  } else {
    this.$el.attr("value", "Following...");
  }

  $.ajax({
    url: `/users/${this.userId}/follow`,
    type: type,
    dataType: "json",
    data: {
      user_id: this.userId
    },
    success: successFunct.bind(this),
  });

};

const successFunct = function(data) {
  this.followState = (this.followState === "followed" ? "unfollowed" : "followed");
  this.render();
};

const toggleFollowState = function(ctx) {
  ctx.followState = (ctx.followState === "unfollowed" ? "followed" : "unfollowed");
};

module.exports = FollowToggle;
