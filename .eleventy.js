module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets");

  eleventyConfig.addCollection('plush', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/plush/**/*.html');

  });

  // Collections
  eleventyConfig.addCollection("postsAscending", (collection) =>
    collection.getFilteredByGlob("src/plush/**/*.html").sort((a, b) => {
      if (a.data.title > b.data.title) return -1;
      else if (a.data.title < b.data.title) return 1;
      else return 0;
    })
  );

eleventyConfig.addCollection("plushTags", collectionApi => {
  return createTagCollection(
    collectionApi,
    "src/plush/**/*.html"
  );
});

  function createTagCollection(collectionApi, glob) {
  const tagSet = new Set();

  collectionApi.getFilteredByGlob(glob).forEach(item => {
    if (item.data.tags) {
      let tags = item.data.tags;
      if (typeof tags === "string") tags = [tags];
      tags.forEach(tag => tagSet.add(tag));
    }
  });

  return [...tagSet].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}


  // Global
    eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();

    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") tags = [tags];
        tags.forEach(tag => tagSet.add(tag));
      }
    });

    return [...tagSet].sort();
    });

  eleventyConfig.addFilter("filterByTag", (items, tag) => {
  return items.filter(item =>
    Array.isArray(item.data.tags) &&
    item.data.tags.includes(tag)
  );
});

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
      templateFormats: ['md', 'njk', 'html'],
      markdownTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
  };
};
