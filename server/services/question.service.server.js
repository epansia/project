module.exports = function(app, models){

    var model = models.QuestionModel;

    //POST calls
    app.post("/api/questionnaire/:wid/question", createQuestion);

    //GET calls
    app.get("/api/questionnaire/:wid/question", findAllQuestionsForQuestionnaire);
    app.get("/api/question/:pid", findQuestionById);

    //PUT calls
    app.put("/api/question/:pid", updateQuestion);

    //DELETE calls
    app.delete("/api/questionnaire/:wid/question/:pid", deleteQuestion);

    //API calls implementation
    function createQuestion(req, res) {
        var wid = req.params.wid;
        var Question = req.body;

        model
            .createQuestion(wid, Question)
            .then(
                function (Question) {
                    if(Question){

                        res.json(Question);

                    } else {

                        Question = null;
                        res.send(Question);
                    }
                },
                function (error) {

                    res.sendStatus(400).send("question service server, createQuestion error");
                }
            )

    }

    function findAllQuestionsForQuestionnaire(req, res) {
        var wid = req.params.wid;

        model
            .findAllQuestionsForQuestionnaire(wid)
            .then(
                function (Questions) {

                    if(Questions) {
                        res.json(Questions);
                    } else {
                        Questions = null;
                        res.send(Questions);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("question service server, findAllQuestionsForQuestionnaire error");
                }
            )

    }

    function findQuestionById(req, res) {
        var pid = req.params.pid;

        model
            .findQuestionById(pid)
            .then(
                function (Question) {
                    if (Question) {
                        res.json(Question);
                    } else {
                        Question = null;
                        res.send(Question);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("question service server, findQuestionById error");
                }
            );

    }

    function updateQuestion(req, res) {
        var pid = req.params.pid;
        var Question = req.body;

        model
            .updateQuestion(pid, Question)
            .then(
                function (Question) {
                    res.json(Question);
                },
                function (error) {
                    res.status(400).send("question service server, updateQuestion error");
                }
            );

    }

    function deleteQuestion(req, res) {
        var wid = req.params.wid;
        var pid = req.params.pid;

        if(pid){
            model
                .deleteQuestion(wid, pid)
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