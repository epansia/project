(function () {
    angular
        .module("WebAppMaker")
        .controller("HomeQuestionController", HomeQuestionController);

    function HomeQuestionController(currentUser) {
        var vm = this;
        vm.currentUser = currentUser;
    }
})();