const FollowToggle = require("./follow_toggle.js");

const UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul");
  this.$el.on("keyup", this.handleInput.bind(this));
};

UsersSearch.prototype.handleInput = function(event) {
  let char = event.target.value;

  $.ajax({
    url: '/users/search',
    type: "GET",
    dataType: "json",
    data: {
      query: char
    },
    success: this.renderResults,
  });
};

UsersSearch.prototype.renderResults = function (data) {
  const $users = $(".users");
  $users.empty();
  let that = this;

  data.forEach( user => {

    let followState = user.followed === true ? "followed" : "unfollowed";

    const tButtonHtml = `<input type="button"
              class="follow-toggle"
              data-fbutton='{"id": ${user.id}, "follow-state": "${followState}" }'
              name="name" value="">`;

    const $li = $(`<li><a href="/users/${user.id}">${user.username}</a></li>`);
    $li.append(tButtonHtml);
    $users.append($li);
  });

  const $fToggles = $users.find(".follow-toggle");
  const fToggles = Array.from($fToggles);

  fToggles.forEach(fToggle => {
    let $fToggle = new FollowToggle(fToggle);
    $fToggle.render();
  });
};

module.exports = UsersSearch;
