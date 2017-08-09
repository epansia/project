module.exports = function(mongoose){
    var widgetSchema = require('../widget/widget.schema.server.js')(mongoose);

    var Schema = mongoose.Schema;

    var QuestionSchema = new Schema({
        _Questionnaire : {type : Schema.Types.ObjectId, ref : 'QuestionnaireModel'},
        name : {type : String, required : true},
        title : String,
        description : String,
        widgets : [{
            type : Schema.Types.ObjectId,
            ref : 'widgetModel'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'Question'});

    return QuestionSchema;
};