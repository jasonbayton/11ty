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

  // Focus on search
  searchInput.focus();

  // Get search from URL
  const urlQuery = new URLSearchParams(window.location.search);
  const searchString = urlQuery.get("s");

  // If search was found, apply it
  if (searchString) {
    handleSearch(searchString);
    searchInput.value = searchString;
  }

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

  // Display results on UI
  function renderResults(results, searchString) {
    // Get search results wrapper
    const searchResultsElement = document.getElementById("searchResults");

    // Clear its contents
    searchResultsElement.innerHTML = "";

    // Do nothing if search was emptied
    if (!searchString) return;

    // Render no results
    if (results.length === 0) {
      // Create paragraph element
      const p = document.createElement("p");

      p.textContent = `No results found`;

      searchResultsElement.appendChild(p);
    }

    // Results received, render them
    else if (results.length > 0) {
      // Create unordered list element
      const ul = document.createElement("ul");

      // Loop through results
      results.forEach((result) => {
        // Create a list item and link for result
        const li = document.createElement("li");
        const a = document.createElement("a");

        const title = result.item.title;

        // Highlight match
        const highlightedTitle = title.replace(
          new RegExp(`(${searchString})`, "gi"),
          "<u><b>$1</b></u>"
        );

        // Set links title and url
        a.innerHTML = highlightedTitle;
        a.title = title;
        a.href = result.item.url;

        li.appendChild(a);
        ul.appendChild(li);
      });

      // Append list of results to wrapper
      searchResultsElement.appendChild(ul);
    }
  }
});
