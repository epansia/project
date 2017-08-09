module.exports = function(mongoose, userModel) {
    var QuestionnaireSchema = require('./questionnaire.schema.server.js')(mongoose);
    var QuestionnaireModel = mongoose.model('QuestionnaireModel', QuestionnaireSchema);

    var api = {
        'createQuestionnaireForUser': createQuestionnaireForUser,
        'findAllQuestionnairesForUser': findAllQuestionnairesForUser,
        'findQuestionnaireById': findQuestionnaireById,
        'updateQuestionnaire': updateQuestionnaire,
        'removeQuestionFromQuestionnaire': removeQuestionFromQuestionnaire,
        'deleteQuestionnaire': deleteQuestionnaire,
        'findAllQuestionnaires' : findAllQuestionnaires,
        'addQuestionToQuestionnaire' : addQuestionToQuestionnaire
     };

     return api;

    function createQuestionnaireForUser(userId, Questionnaire) {
        // console.log(Questionnaire);
        Questionnaire._user = userId;
        return QuestionnaireModel
            .create(Questionnaire)
            .then(
                function (Questionnaire) {
                    return userModel
                        .addQuestionnaireForUser(userId, Questionnaire._id)
                });
    }

     function findAllQuestionnairesForUser(userId) {
         return questionnaires = QuestionnaireModel
             .find({_user: userId})
             .populate('_user')
             .exec();
     }

     function findQuestionnaireById(QuestionnaireId) {
         return QuestionnaireModel.findOne({_id: QuestionnaireId});
     }

     function updateQuestionnaire(QuestionnaireId, Questionnaire) {
         return QuestionnaireModel.update({
             _id : QuestionnaireId
         }, {
             name: Questionnaire.name,
             description: Questionnaire.description
         });
     }

     function removeQuestionFromQuestionnaire(QuestionnaireId, QuestionId) {
         QuestionnaireModel
             .findOne({_id: QuestionnaireId})
             .then(
                 function(Questionnaire){
                     var index = Questionnaire.Questions.indexOf(QuestionId);
                     Questionnaire.Questions.splice(index, 1);
                     // Questionnaire.Questions.pull(QuestionId);
                     Questionnaire.save();
                 },
                 function(error){
                     console.log(error);
                 }
             );
     }

     function addQuestionToQuestionnaire(QuestionnaireId, QuestionId) {
         return QuestionnaireModel
             .findOne({_id: QuestionnaireId})
             .then(function (Questionnaire) {
                 Questionnaire.Questions.push(QuestionId);
                 return Questionnaire.save();
             });
     }

     function deleteQuestionnaire(userId, QuestionnaireId) {
         return QuestionnaireModel
             .remove({_id: QuestionnaireId})
             .then(
                 function (status) {
                     return userModel
                         .removeQuestionnaireFromUser(userId, QuestionnaireId);
                 }
             );
     }

     function findAllQuestionnaires() {
         return QuestionnaireModel.find();
     }

};