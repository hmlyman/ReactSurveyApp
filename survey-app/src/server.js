var fs = require('fs');
var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var data = require('./SurveyApp/data.json');
const { Survey } = require('./SurveyApp/component');

var SURVEY_FILE = path.join(__dirname, 'data.json');

router.use(function(req, res, next) {
    console.log("Router something is happening");
    next();
});
router.get('/', function (req, res) {
    res.json({message: 'welcome to the API'});
})
router.route('/oldsurvey')
    .post(function(req, res) {
        let survey = new Survey();
        survey.name = req.body.name;

        survey.save(function (err) {
            if (err) 
            res.send(err);
            res.json({ message: 'Survey created!'});
        })
    .get(function(req, res) {
        survey.find(function(err, surveys){
            if (err)
                res.send(err);
            res.json(surveys);
        })
    })
    })

router.route('/oldsurvey/:survey_id')
        .get(function(req, res) {
        survey.findById(req.params.survey_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });

app.set('port', (process.env.PORT || 3000));
app.use('/api', router);
app.use('/', express.static(path.join(__dirname, 'SurveyApp')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/OldSurvey', function(req, res) {
    fs.readFile(SURVEY_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let survey = JSON.parse(data);
        let newSurvey = {
            id: Date.now(),
            contributor: req.body.contributor,
            amount: req.body.amount, 
            comment: req.body.comment
        };
        survey.push(newSurvey);
        fs.writeFile(SURVEY_FILE, JSON.stringify(survey), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Cache-Control', 'no-cache');
            res.json(survey);
        })
    })
})

app.listen(app.get('port'), function() {
    console.log('Server started: https://localhost:' + app.get('port') + '/');
})
console.log('Running on port ' + port);