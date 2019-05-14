'use strict';

angular.module('followingList', ['ngRoute'])
  .component('followingList', {
    templateUrl: 'following/following.html',
    controller: ['$http', '$rootScope', function TweetListController($http, $rootScope) {
      var self = this;

      const requestOptions = {
          headers: { 'X-session': $rootScope.x_session }
		};
		self.sendfollow = function sendfollow(username) {

			const data = "followingname=" + encodeURIComponent(username);
			$http.post('http://localhost:8080/twitterapi/following/', data, requestOptions);
		}
		self.sendunfollow = function sendunfollow(username) {
			$http.defaults.headers.delete = { 'X-session': $rootScope.x_session };
			const data = "followingname=" + encodeURIComponent(username);
			$http.delete('http://localhost:8080/twitterapi/following/?' + data);
		}

      $http.get('http://localhost:8080/twitterapi/following/', requestOptions).then(function (response) {
        self.followings = response.data;
      });
    }]
});