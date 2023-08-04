import { getTags } from "@/api";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";

const TagList = ({ onSelect }: { onSelect: (tag: string | null) => void }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data } = useQuery({
    queryFn: () => getTags({}).then(({ data }) => data.tags),
    queryKey: ["tags"],
  });

  return (
    <ul>
      {(data || []).map((t, i) => (
        <li key={i} className="inline-flex">
          <button
            type="button"
            className={classNames(
              "bg-gray rounded-full text-white text-sm px-2 mr-1",
              {
                "bg-green": t === selectedTag,
              },
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
