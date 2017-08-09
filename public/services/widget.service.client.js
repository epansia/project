(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var service = {
            "createWidget" : createWidget,
            "findWidgetsByQuestionId" : findWidgetsByQuestionId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return service;

        function createWidget(QuestionId, widget) {
            // console.log("to service");
            var url = "/api/question/" + QuestionId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    // console.log("have response");
                    return response.data;
                });
        }

        function findWidgetsByQuestionId(QuestionId) {
            var url = "/api/question/" + QuestionId + "/widget";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(QuestionId, widgetId) {
            var url = "/api/question/" + QuestionId + "/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
