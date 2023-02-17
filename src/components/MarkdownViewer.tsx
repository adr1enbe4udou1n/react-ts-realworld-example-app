import { marked } from "marked";

const MarkdownViewer = ({ source }: { source: string }) => {
  return (
    <div
      className="prose mx-auto max-w-full dark:text-gray-300"
      dangerouslySetInnerHTML={{ __html: marked(source) }}
    ></div>
  );
};

export default MarkdownViewer;
