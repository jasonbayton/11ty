document.addEventListener("DOMContentLoaded", async () => {
  let searchData = null;

  // Fetch search data from index
  await fetch("/search-index.json")
    .then((res) => res.json())
    .then((data) => {
      searchData = data;
    })
    .catch((err) => {
      console.warn(err);
    });

  // No search possible without data
  if (!searchData) return;

  // Fuse options
  const searchOptions = {
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.1,
    keys: ["title"],
  };

  // Init fuse
  const fuse = new Fuse(searchData, searchOptions);

  // Get search input
  const searchInput = document.getElementById("searchField");

  // Watch key evets on search input
  searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.trim();
    handleSearch(searchValue);
  });
});
