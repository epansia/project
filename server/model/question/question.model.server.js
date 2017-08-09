module.exports = function(mongoose, QuestionnaireModel){
    var QuestionSchema = require('./question.schema.server.js')(mongoose);
    var QuestionModel = mongoose.model('QuestionModel', QuestionSchema);

    var api = {
        'createQuestion' : createQuestion,
        'findAllQuestionsForQuestionnaire' : findAllQuestionsForQuestionnaire,
        'findQuestionById' : findQuestionById,
        'updateQuestion' : updateQuestion,
        'deleteQuestion' : deleteQuestion,
        'removeWidgetFromQuestion' : removeWidgetFromQuestion,
        'addWidgetToQuestion' : addWidgetToQuestion
    };

    return api;

    function createQuestion(QuestionnaireId, Question) {
        Question._Questionnaire = QuestionnaireId;
        return QuestionModel.create(Question)
            .then(
                function (Question) {
                    return QuestionnaireModel.addQuestionToQuestionnaire(QuestionnaireId, Question._id);
                }
            );
    }

    function findAllQuestionsForQuestionnaire(QuestionnaireId) {
        return Questions = QuestionModel
            .find({_Questionnaire: QuestionnaireId})
            .populate('_Questionnaire')
            .exec();
    }

    function findQuestionById(QuestionId) {
        return QuestionModel.findById(QuestionId);
    }

    function updateQuestion(QuestionId, Question) {
        return QuestionModel.update({
            _id : QuestionId
        }, {
            name: Question.name,
            title: Question.title,
            description: Question.description
        });
    }

    function deleteQuestion(QuestionnaireId, QuestionId) {
        // var QuestionnaireId = QuestionModel.findOne({_id: QuestionId})._Questionnaire;
        return QuestionModel
            .remove({_id: QuestionId})
            .then(function (status) {
                return QuestionnaireModel
                    .removeQuestionFromQuestionnaire(QuestionnaireId, QuestionId);
            });
    }

    function removeWidgetFromQuestion(QuestionId, widgetId) {
        QuestionModel
            .findById(QuestionId)
            .then(
                function (Question) {
                    // Question.widgets.pull(widgetId);
                    var index = Question.widgets.indexOf(widgetId);
                    Question.widgets.splice(index, 1);
                    Question.save();
                },
                function (error) {
                    console.log("Question model, removeWidgetFromQuestion error");
                }
            );
    }

    function addWidgetToQuestion(QuestionId, widgetId) {
        return QuestionModel
            .findOne({_id: QuestionId})
            .then(function (Question) {
                Question.widgets.push(widgetId);
                return Question.save();
            });
    }

};