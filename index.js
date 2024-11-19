import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The 10 biggest mistakes I made bootstrapping to $1M ARR",
    img: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f7b1949-9218-4836-9222-373103bf905d_1080x652.png",
    content:
      "In this post, the founder of eWebinar shares lessons learned from various go-to-market strategies that failed to deliver significant results for their SaaS startup. Despite investing in tactics like Product Hunt launches, digital marketing agencies, paid ads, and affiliate partnerships, they found that many approaches were either too early-stage for their business or lacked the necessary foundation to succeed. It is important to understand key marketing principles firsthand and recognize that sustainable growth comes from consistent effort rather than quick hacks.",
    author: "Melissa Kwan",
    date: "06/10/2024",
    link: "https://www.growthunhinged.com/p/the-10-biggest-mistakes-i-made-bootstrapping?utm_source=tldrfounders",
  },
  {
    id: 2,
    title: "The Rise of Intelligent Automation",
    img: "https://d1lamhf6l6yk6d.cloudfront.net/uploads/2024/11/241010-RIP-to-RPAs-ILG-C-x2000.png",
    alt: "post02",
    content:
      "The rise of artificial intelligence (AI), particularly through large language models, offers a significant opportunity to automate internal operational tasks within organizations that have traditionally relied on labor-intensive processes. While robotic process automation has not fully realized the goal of true automation, AI agents are now capable of adapting to various inputs and automating complex workflows. This development creates a vast market for startups to develop both horizontal enablers and vertical solutions tailored to specific industries, unlocking new efficiencies and reducing operational costs.",
    author: "Kimberly Tan",
    date: "08/15/2024",
    link: "https://a16z.com/rip-to-rpa-the-rise-of-intelligent-automation/?utm_source=tldrfounders",
  },
  {
    id: 3,
    title: "Reducing Complexity",
    img: "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e27165d-30b7-4144-9155-16bbdc0731ae_2370x1454.png",
    alt: "post03",
    content:
      'Product work is inherently complex, involving uncertainty, collaboration, and novel problems. When executives try to "reduce complexity," they often mistake the cognitive load caused by too many priorities and friction for the complexity of the work itself. Instead of attempting to simplify the work, leaders should focus on creating an environment where people can effectively handle complexity by setting clear boundaries and reducing drag.',
    author: "John Cutler",
    date: "11/14/2024",
    link: "https://cutlefish.substack.com/p/tbm-321-reducing-complexity?utm_source=tldrfounders",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.title,
    image: req.body.img,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
    link: req.body.link,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.img) post.img = req.body.img;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  if (req.body.date) post.date = req.body.date;
  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
