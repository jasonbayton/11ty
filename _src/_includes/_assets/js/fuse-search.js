const deleteSpinner = () => {
  const debouncing = document.getElementById("debouncing");

  if (debouncing) debouncing.remove();
};

const debounce = (func) => {
  let timeout;

  return function execute(...args) {
    // Empty search, remove spinner
    if (document.getElementById("searchField").value.trim() === "") {
      deleteSpinner;
      clearTimeout(timeout);
    } else if (!document.getElementById("debouncing")) {
      const searchResultsElement = document.getElementById("search-field");

      const loading = document.createElement("p");
      loading.ariaLabel = "loading";
      loading.id = "debouncing";

      searchResultsElement.appendChild(loading);
    }

    // Run function
    const later = () => {
      clearTimeout(timeout);
      deleteSpinner();

      func(...args);
    };

    // Clear older timeout before attemping to run
    clearTimeout(timeout);
    timeout = setTimeout(later, 150);
  };
};

document.addEventListener("DOMContentLoaded", async () => {
  let searchData = null;

  // Fetch search data from index
  await fetch("/search-index.json")
    .then((res) => res.json())
    .then((data) => {
      searchData = data;
    })
    .catch((err) => {
      console.warn("Fetch error", err);
    });

  // No search possible without data
  if (!searchData) return;

  // Fuse options
  const searchOptions = {
    includeMatches: true,
    ignoreLocation: true,
    // Needs to be a strict match
    threshold: 0.0,
    keys: ["title", "content"],
  };

  // Init fuse
  const fuse = new Fuse(searchData, searchOptions);

  // Get search input
  const searchInput = document.getElementById("searchField");

  // Focus on search
  searchInput.focus();

  // Get search from URL
  const urlQuery = new URLSearchParams(window.location.search);
  const searchString = urlQuery.get("q");

  // If search was found, apply it
  if (searchString) {
    handleSearch(searchString);
    searchInput.value = searchString;
  }

  // Watch key evets on search input
  searchInput.addEventListener(
    "keyup",
    debounce(function () {
      // Get search value
      const searchValue = searchInput.value.trim();

      // Handle URL
      if (searchValue === "") {
        // Remove URL query as search is empty
        urlQuery.delete("q");
        window.history.replaceState({}, "", `${window.location.pathname}`);
        deleteSpinner();
      } else {
        // Set URL query
        urlQuery.set("q", searchValue);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${urlQuery}`
        );
      }

      // Run search
      handleSearch(searchValue);
    })
  );

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

      p.className = "search-no-results";
      p.textContent = `No results found`;

      searchResultsElement.appendChild(p);
    }

    // Results received, render them
    else if (results.length > 0) {
      // Create unordered list element
      const ul = document.createElement("ul");

      // Loop through results
      results.forEach((result) => {
        // Get title of match
        const title = result.item.title;

        // Create a list item and link for result
        const li = document.createElement("li");
        const a = document.createElement("a");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");

        let highlightedTitle;
        let highlightedContent;

        // Loop through matches
        result.matches.forEach((match) => {
          const { key, value } = match;

          // Matches title
          if (key === "title") {
            // Highlight match
            highlightedTitle = value.replace(
              new RegExp(`(${searchString})`, "gi"),
              "<u><b>$1</b></u>"
            );
          } else {
            const exec =
              new RegExp(`(${searchString})`, "gi").exec(value) ?? {};
            const matchIndex = exec.index;

            if (matchIndex) {
              const wrapperLength = 100;

              const start = matchIndex - wrapperLength;

              if (start < 0) {
                // Matches content
                highlightedContent =
                  value
                    .substring(
                      0,
                      matchIndex + searchString.length + wrapperLength
                    )
                    .replace(
                      new RegExp(`(${searchString})`, "gi"),
                      "<u><b>$1</b></u>"
                    ) + "...";
              } else {
                const substring = value.substring(
                  matchIndex - wrapperLength,
                  matchIndex + searchString.length + wrapperLength
                );

                const array = substring.split(" ");
                array.shift();

                // Matches content
                highlightedContent =
                  "... " +
                  array
                    .join(" ")
                    .replace(
                      new RegExp(`(${searchString})`, "gi"),
                      "<u><b>$1</b></u>"
                    ) +
                  "...";
              }
            }
          }

          // Set title
          h2.innerHTML = highlightedTitle ?? title;

          // Set links title and url
          a.title = title;
          a.href = result.item.url;
        });

        a.appendChild(h2);

        if (highlightedContent) {
          p.innerHTML = highlightedContent;
          a.appendChild(p);
        }

        li.appendChild(a);
        ul.appendChild(li);
      });

      // Append list of results to wrapper
      searchResultsElement.appendChild(ul);
    }
  }
});
