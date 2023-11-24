export const useSlug = () => {
  const titleToSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
  const slugToTitle = (text: string) => text.toLowerCase().replace(/-/g, " ");

  return {
    titleToSlug,
    slugToTitle,
  };
};
