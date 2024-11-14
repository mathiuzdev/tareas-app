import { useState, useEffect } from "react";
import { createTag, fetchTags } from "../services/tag";
import { Tag, NewTag } from "../types/index";

export const useTags = () => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<NewTag>({ name: "", color: "" });

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const tags = await fetchTags();
    setAvailableTags(tags);
  };

  const handleNewTag = async () => {
    if (newTag.name && newTag.color) {
      const createdTag = await createTag(newTag);
      setAvailableTags((prevTags) => [...prevTags, createdTag]);
      setNewTag({ name: "", color: "" });
      return createdTag;
    }
    return null;
  };

  return {
    availableTags,
    newTag,
    setNewTag,
    handleNewTag,
  };
};
