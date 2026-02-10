const escapeHtml = (str) => {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return str.replace(/[&<>"']/g, (c) => map[c]);
};

const deleteSpinner = () => {
  const debouncing = document.getElementById("debouncing");

  if (debouncing) debouncing.remove();
};

const debounce = (func) => {
  let timeout;

  return function execute(...args) {
    // Empty search, remove spinner
    if (document.getElementById("searchField").value.trim() === "") {
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
    timeout = setTimeout(later, 300);
  };
};

document.addEventListener("DOMContentLoaded", () => {
  // Fuse options
  const searchOptions = {
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.3,
    keys: ["title", "content", "url"],
  };

  // Init search worker — fetches and indexes data in the background
  const worker = new Worker("/js/fuse-search-worker.js");
  let workerReady = false;
  let pendingQuery = null;

  worker.onmessage = function (e) {
    const { type, data } = e.data;

    if (type === "ready") {
      workerReady = true;
      // Run any search that was queued while worker was initialising
      if (pendingQuery !== null) {
        worker.postMessage({ type: "search", data: { query: pendingQuery } });
        pendingQuery = null;
      }
    }

    if (type === "error") {
      console.warn("Search worker error", data.message);
    }

    if (type === "results") {
      deleteSpinner();
      renderResults(data.results, data.query);
    }
  };

  // Kick off fetch + indexing immediately
  worker.postMessage({ type: "init", data: { options: searchOptions } });

  // Get search input
  const searchInput = document.getElementById("searchField");
  const clearButton = document.getElementById("search-clear");

  // Show/hide clear button based on input value
  function updateClearButton() {
    clearButton.hidden = searchInput.value.trim() === "";
  }

  // Focus on search if search input exists
  if (searchInput) {
    searchInput.focus();
  }

  // Get search from URL
  const urlQuery = new URLSearchParams(window.location.search);
  const searchString = urlQuery.get("q");

  // If search was found, apply it
  if (searchString) {
    handleSearch(searchString);
    searchInput.value = searchString;
    updateClearButton();
  }

  // Clear button handler
  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    urlQuery.delete("q");
    window.history.replaceState({}, "", `${window.location.pathname}`);
    deleteSpinner();
    handleSearch("");
    updateClearButton();
    searchInput.focus();
  });

  // Watch key evets on search input
  if (searchInput) {
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

        updateClearButton();

        // Run search
        handleSearch(searchValue);
      })
    )
  };

  // Method to handle new searches
  function handleSearch(searchString) {
    // Empty search or too short, display no results
    if (!searchString || searchString.length < 2) {
      renderResults([], searchString);
      return;
    }

    // Send search to worker
    if (workerReady) {
      worker.postMessage({ type: "search", data: { query: searchString } });
    } else {
      pendingQuery = searchString;
    }
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
      // Create regex once for all results (case-insensitive)
      const searchRegex = new RegExp(`(${searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");

      // Build HTML string instead of DOM manipulation
      let htmlString = "<ul>";

      // Loop through results
      results.forEach((result) => {
        // Get title of match
        const title = result.item.title;

        let highlightedTitle = title;
        let highlightedContent = "";

        // Loop through matches
        result.matches.forEach((match) => {
          const { key, value } = match;

          // Matches title
          if (key === "title") {
            // Highlight match - use the cached regex
            highlightedTitle = value.replace(
              searchRegex,
              "<u><b>$1</b></u>"
            );
          } else {
            const exec = searchRegex.exec(value);

            if (exec) {
              const matchIndex = exec.index;
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
                      searchRegex,
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
                      searchRegex,
                      "<u><b>$1</b></u>"
                    ) +
                  "...";
              }
            }

            // Reset regex for next use
            searchRegex.lastIndex = 0;
          }
        });

        // Build HTML string
        htmlString += `<li><a href="${escapeHtml(result.item.url)}" title="${escapeHtml(title)}"><h2>${highlightedTitle}</h2>`;

        if (highlightedContent) {
          htmlString += `<p>${highlightedContent}</p>`;
        }

        htmlString += `</a></li>`;
      });

      htmlString += "</ul>";

      // Single DOM update
      searchResultsElement.innerHTML = htmlString;
    }
  }
});
