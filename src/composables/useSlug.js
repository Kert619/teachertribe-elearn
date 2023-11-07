export const useSlug = () => {
  const titleToSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");
  const slugToTitle = (text) => text.toLowerCase().replace(/-/g, " ");

  return {
    titleToSlug,
    slugToTitle,
  };
};
