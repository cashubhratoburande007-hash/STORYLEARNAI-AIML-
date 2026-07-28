import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Result.css";

function Result({ result }) {
    return (
        <div className="card mt-4 p-3">
            <div className="card shadow p-4">
                <h3>📖 AI Generated Story</h3>

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default Result;