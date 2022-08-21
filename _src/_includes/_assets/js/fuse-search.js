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

});
