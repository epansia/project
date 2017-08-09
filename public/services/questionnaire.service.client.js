(function () {
    angular
        .module("polls")
        .factory('QuestionnaireService', QuestionnaireService);

    function QuestionnaireService($http) {

        var services = {
            'createQuestionnaire': createQuestionnaire,
            'findQuestionnairesByUser': findQuestionnairesByUser,
            'findQuestionnaireById': findQuestionnaireById,
            'updateQuestionnaire': updateQuestionnaire,
            'deleteQuestionnaire': deleteQuestionnaire,
            'deleteQuestionnairesByUser': deleteQuestionnairesByUser
        };
        return services;

        function createQuestionnaire(userId, Questionnaire) {
            var url = "/api/user/" + userId + "/questionnaire";
            return $http.post(url, Questionnaire)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function findQuestionnairesByUser(userId) {
            var url = "/api/user/" + userId + "/questionnaire";
            return $http.get(url)
                .then(
                    function (response) {
                        return response.data;
                    });
        }

        function findQuestionnaireById(QuestionnaireId) {
            var url = "/api/questionnaire/" + QuestionnaireId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateQuestionnaire(QuestionnaireId, Questionnaire) {
            console.log("do update questionnaire");
            var url = "/api/questionnaire/" + QuestionnaireId;
            return $http.put(url, Questionnaire)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteQuestionnaire(userId, QuestionnaireId) {
            var url = "/api/user/" + userId + "/questionnaire/" + QuestionnaireId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteQuestionnairesByUser(userId) {
            for (w in Questionnaires) {
                questionnaire = Questionnaires[w];
                if (questionnaire.developerId === userId) {
                    deleteQuestionnaire(questionnaire._id);
                }
            }
        }
    }
})();