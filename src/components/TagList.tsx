import { getTags } from "@/api";
import classNames from "classnames";
import { useEffect, useState } from "react";

const TagList = ({ onSelect }: { onSelect: (tag: string | null) => void }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    getTags({}).then(({ data }) => setTags(data.tags));
  }, []);

  return (
    <ul>
      {tags.map((t, i) => (
        <li key={i} className="inline-flex">
          <button
            type="button"
            className={classNames(
              "bg-gray rounded-full text-white text-sm px-2 mr-1",
              {
                "bg-green": t === selectedTag,
              }
            )}
            onClick={() => {
              const tag = t === selectedTag ? null : t;
              setSelectedTag(tag);
              onSelect(tag);
            }}
          >
            {t}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
