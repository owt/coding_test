import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import cors from 'cors';
import Institution from "./model/institution";
import Submission from "./model/submission";
import SubmissionSubject from "./model/submission-subject";

const createApp = () => {
  const app = express();
  app.use(json());
  app.use(cors())

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/institutions", (req, res) => {
    const institution = new Institution();
    institution.getAll().then((data) => {
      res.send({ 
        "total_rows": data.rowCount, 
        "institutions": data.rows
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ "error": "Institutions not found" });
    });
  });

  app.get("/submissions/for-institution/:institutionId", (req, res) => {
    const submission = new Submission();
    submission.getByInstitution(req.params.institutionId).then((submission) => {
      
      // Build list
      Promise.all(submission.rows.map(async (row) => {
        row.subjects = [];
        const submissionSubject = new SubmissionSubject();
        let subject = await submissionSubject.getBySubmission(row.id);
        row.subjects = subject.rows;
        return row;
      })).then((data) => {
        res.send({ 
          "total_rows": data.length, 
          "submissions": data
        });
      })
    })
    .catch((err) => {
      console.error(err);
      res.send({ "error": "Submissions not found" });
    });
  });

  app.get("/submission-subjects/for-submission/:submissionId", (req, res) => {
    const submission = new Submission();
    submission.getByInstitution(req.params.submissionId).then((data) => {
      res.send({ 
        "total_rows": data.rowCount, 
        "subjects": data.rows
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ "error": "Subjects not found" });
    });
  });

  return app;
}

export default createApp;