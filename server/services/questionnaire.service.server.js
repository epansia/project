module.exports = function(app, models){


    var model = models.QuestionnaireModel;

    //POST Calls
    app.post('/api/user/:uid/questionnaire',createQuestionnaire);

    //GET Calls
    app.get('/api/user/:uid/questionnaire',findAllQuestionnairesForUser);
    app.get('/api/questionnaire/:wid',findQuestionnaireById);

    //PUT Calls
    app.put('/api/questionnaire/:wid',updateQuestionnaire);

    //DELETE Calls
    app.delete('/api/user/:uid/questionnaire/:wid',deleteQuestionnaire);


    /*API calls implementation*/
    function createQuestionnaire(req, res) {
        var uid = req.params.uid;
        var Questionnaire = req.body;


        model
            .createQuestionnaireForUser(uid, Questionnaire)
            .then(
                function (Questionnaire) {
                    if(Questionnaire){
                        // console.log("in if branch");
                        res.json(Questionnaire);
                        // res.send(200);
                    } else {
                        // console.log("in else branch");
                        Questionnaire = null;
                        res.send(Questionnaire);
                    }
                }
                ,
                function (error) {
                    // console.log("in error branch");
                    res.sendStatus(400).send("questionnaire service server, createQuestionnaireForUser error");
                }
            )

    }

    function findAllQuestionnairesForUser(req, res) {
        var uid = req.params.uid;
        // console.log("in service: " + uid);

        model
            .findAllQuestionnairesForUser(uid)
            .then(
                function (Questionnaires) {
                    // console.log("in service: " + Questionnaires);
                    if(Questionnaires) {
                        res.json(Questionnaires);
                    } else {
                        Questionnaires = null;
                        res.send(Questionnaires);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("questionnaire service server, findAllQuestionnairesForUser error");
                }
            )

    }

    function findQuestionnaireById(req, res) {
        var wid = req.params.wid;

        model
            .findQuestionnaireById(wid)
            .then(
                function (Questionnaire) {
                    if(Questionnaire) {
                        res.json(Questionnaire);
                    } else {
                        Questionnaire = null;
                        res.send(Questionnaire);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )


    }

    function updateQuestionnaire(req, res) {

        var wid = req.params.wid;
        var Questionnaire = req.body;

        model
            .updateQuestionnaire(wid, Questionnaire)
            .then(
                function (Questionnaire){
                    res.json(Questionnaire)
                },
                function (error){
                    res.sendStatus(400).send("questionnaire service server, updateQuestionnaire error");
                }
            );

    }

    function deleteQuestionnaire(req, res) {
        var uid = req.params.uid;
        var wid = req.params.wid;

        if(wid){
            model
                .deleteQuestionnaire(uid, wid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }

    }
};