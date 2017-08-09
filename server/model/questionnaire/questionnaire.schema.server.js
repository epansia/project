

module.exports = function(mongoose){
    // var QuestionSchema = require("../question/question.schema.server")(mongoose);

    var Schema = mongoose.Schema;

    var questionnaireSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        name: String,
        description: String,
        Questions : [{
            type: Schema.Types.ObjectId,
            ref : 'questionModel'
        }],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'questionnaire'});

    return questionnaireSchema;
};