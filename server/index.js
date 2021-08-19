import React from "react";
import express from "express";
import { readFileSync } from "fs";
import { renderToString } from "react-dom/server";

import { App } from "../client/App.jsx";

const data = {
  questions: [
    {
      questionId: "q1",
      content: "should we use jquery or fetch for AJAX",
    },
    {
      questionId: "q2",
      content: "What is the best feature of react",
    },
  ],
  answers: [
    {
      answerId: "a1",
      questionId: "q1",
      upvotes: 2,
      content: "jquery",
    },
    {
      answerId: "a2",
      questionId: "q1",
      upvotes: 2,
      content: "fetch",
    },
    {
      answerId: "a3",
      questionId: "q2",
      upvotes: 2,
      content: "your mom",
    },
  ],
};

const app = new express();

app.use(express.static("dist"));

app.get("/", async (_req, res) => {
  const index = readFileSync(`public/index.html`, `utf8`);
  const rendered = renderToString(<App {...data} />);
  res.send(index.replace("{{rendered}}", rendered));
});

app.listen(7777);
console.info("server running");
