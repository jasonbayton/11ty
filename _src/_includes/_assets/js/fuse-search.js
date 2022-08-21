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

  // Method to handle new searches
  async function handleSearch(searchString) {
    // Empty search, display no results
    if (!searchString) {
      renderResults([], searchString);
      return;
    }

    // Get search results and display them
    const results = fuse.search(searchString);
    renderResults(results, searchString);
  }
});
