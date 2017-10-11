const router = require("express").Router();
const textract = require('textract');
const mongoose = require('mongoose');
const resumeController = require("../../controllers/resumeControllers");


// Textract
var pdftotext = require('pdftotextjs');


var resume = textract.fromFileWithPath("./Resumes/Wiley-K.-Resume.pdf", processText)

function processText(err, text){
  if (err){
    console.error("There was an error", err);
    return;
  }
  console.log(text);
}


// router.post(resume.save);

// router.post('/', function(req, res) {
// 	resume.save(function(error, doc) {
// 		if (error) {
// 			throw (error)
// 		}
// 		else {
// 			console.log(doc)
// 		}
// 	})
// })

router.route("/")
  .post(resumeController.create);


//router.post()

module.exports = router;