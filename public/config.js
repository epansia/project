(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/dashboard', {
                templateUrl : "views/user/templates/dashboard.view.client.html",
            })
            .when('/admin', {
                templateUrl : "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    admin: checkAdmin
                }
            })
            .when('/questionnaire', {
                templateUrl : "views/questionnaire/templates/questionnaire-list.view.client.html",
                controller: "QuestionnaireListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/questionnaire/new', {
                templateUrl : "views/questionnaire/templates/questionnaire-new.view.client.html",
                controller: "NewQuestionnaireController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/questionnaire/:wid', {
                templateUrl : "views/questionnaire/templates/questionnaire-edit.view.client.html",
                controller: "EditQuestionnaireController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/question', {
                templateUrl : "views/question/templates/question-list.view.client.html",
                controller: "QuestionListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/question/new', {
                templateUrl : "views/question/templates/question-new.view.client.html",
                controller: "NewQuestionController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/question/:pid', {
                templateUrl : "views/question/templates/question-edit.view.client.html",
                controller: "EditQuestionController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/home", {
                templateUrl : "./views/home/templates/home.html",
                controller: "HomeQuestionController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo : "/home"
            });
    }

    // security
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user === '0') {
                    user = null;
                }
                deferred.resolve(user);

            });
        return deferred.promise;
    };

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    if (user.roles.indexOf('ADMIN') > -1) {
                        deferred.resolve(user);
                    }
                } else {
                    $location.url('/home');
                }

            });
        return deferred.promise;
    };

})();