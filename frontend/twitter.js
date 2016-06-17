const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$( () => {
  const $allFToggles = $(".follow-toggle");
  const allFToggles = Array.from($allFToggles);

  for (let i = 0; i < allFToggles.length; i++) {
    let $fToggle = $(allFToggles[i]);
    new FollowToggle($fToggle);
  }

  const $usersSearchList = $("nav.users-search");
  const usersSearchList = Array.from($usersSearchList);
  for (let i = 0; i < usersSearchList.length; i++) {
    let $usersSearch = $(usersSearchList[i]);
    new UsersSearch($usersSearch);
  }

  const $tweetCompose = $(".tweet-compose");
  new TweetCompose($tweetCompose);
});
