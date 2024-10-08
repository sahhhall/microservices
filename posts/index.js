import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from 'axios';
const app = express();

const corsOptions = {
    origin:"*",
}

app.use(cors(corsOptions));
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  })
  res.status(201).send(posts[id]);
});

app.post('/events',(req,res)=> {
  console.log('reciving event', req.body.type);
  res.send({})
})

app.listen(4000, () => {
  console.log(`running on 4000`);
});
