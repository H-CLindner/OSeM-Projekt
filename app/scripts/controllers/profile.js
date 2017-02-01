(function () {
  'use strict';

  angular.module('openSenseMapApp')
    .controller('profileCtrl',profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'userService'];

  function profileCtrl($location, meanData, userService) {
    var vm = this;

    vm.user = {};

    vm.saveUser = saveUser;
    vm.deleteUser = deleteUser;

    meanData.getProfile()
      .success(function (data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

    function saveUser() {
      if (vm.user.password !== vm.user.password2) {
        alert("Passwörter stimmen nicht überein!");
      } else {
        userService.update(vm.user)
          .then(function () {
            $location.path('/loginsuccess');
          })
          .catch(function (e) {
            console.log(e);
          });
      }
    }

    function deleteUser() {
      userService.deleteUsers(vm.user)
        .then(function(){
          $location.path('/login');
            document.getElementById('navlogin').style.display='block'
            document.getElementById('profile').style.display='none'
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  }

})();
