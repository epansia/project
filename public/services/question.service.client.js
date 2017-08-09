(function () {
    angular
        .module("WebAppMaker")
        .factory("QuestionService", QuestionService);

    function QuestionService($http){
        var services = {
            'createQuestion' : createQuestion,
            'findQuestionByQuestionnaireId' : findQuestionByQuestionnaireId,
            'findQuestionById' : findQuestionById,
            'updateQuestion' : updateQuestion,
            'deleteQuestion' : deleteQuestion,
            'deleteQuestionsByQuestionnaire' : deleteQuestionsByQuestionnaire
        };
        return services;

        function createQuestion(QuestionnaireId, Question){
            var url = "/api/questionnaire/" + QuestionnaireId + "/question";
            return $http.post(url, Question)
                .then(function (response) {
                    return response.data;
                });
        }

        function findQuestionById(QuestionId){
            var url = "/api/question/" + QuestionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findQuestionByQuestionnaireId(QuestionnaireId) {
            var url = "/api/questionnaire/" + QuestionnaireId + "/question";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateQuestion(QuestionId, Question){
            var url = "/api/question/" + QuestionId;
            return $http.put(url, Question)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteQuestion(QuestionnaireId, QuestionId) {
            var url = "/api/questionnaire/" + QuestionnaireId + "/question/" + QuestionId;
            console.log(url);
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteQuestionsByQuestionnaire(QuestionnaireId){
            var url = "/api/questionnaire/" + QuestionnaireId + "/question";
            return $http.delete(url);
        }
    }
})();