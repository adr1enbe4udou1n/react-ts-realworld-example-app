import { useState } from "react";

const TagInput = ({ onChange }: { onChange: (tags: string[]) => void }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      onChange(newTags);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Tags"
        className="form-control"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
      />

      <div className="mt-2">
        <ul>
          {tags.map((tag, i) => (
            <li key={i} className="inline-flex">
              <button
                type="button"
                className="bg-gray rounded-full text-white text-sm px-2 mr-2 flex items-center"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <i className="i-carbon-close inline-block" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TagInput;
