import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function Adnandothesum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(`CLick on review and ⏳ Wait  for review...`)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    // const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    // setReview(response.data)

    setLoading(true); // Start loader
    setReview("⏳ Waiting for review..."); // Optional: show in right section

    try {
      const res = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(res.data);
    } catch (err) {
      console.error(err);
      setReview("❌ Failed to fetch review");
    } finally {
      setLoading(false); // Stop loader
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">{}{loading ? "⏳ Reviewing..." : "Review Code"}
           </div>

        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[rehypeHighlight]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App