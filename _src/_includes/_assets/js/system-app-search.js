async function buildTable() {
  const tableBody = document.querySelector('#appTable tbody');
  const searchInput = document.getElementById('searchInput');
  const filterMake = document.getElementById('filterMake');
  const filterModel = document.getElementById('filterModel');
  const filterOS = document.getElementById('filterOS');

  const rows = Array.from(tableBody.querySelectorAll('tr')).map(tr => {
    const [pkgCell, appCell, makeCell, modelCell, osCell, alsoCell, userFacingCell] = tr.children;
    return {
      element: tr,
      packageName: pkgCell.textContent.trim(),
      appName: appCell.textContent.trim(),
      make: makeCell.textContent.trim(),
      model: modelCell.textContent.trim(),
      os: osCell.textContent.trim(),
      alsoKnownBy: alsoCell.textContent.trim(),
      userFacing: userFacingCell.textContent.trim().toLowerCase()
    };
  }).filter(row =>
    row.make !== '' || row.model !== '' || row.os !== ''
  );

  function updateFilters() {
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    const clean = val => (val || '').toString().trim().replace(/\s+/g, ' ');

    const extractUnique = (getter) => {
      return [...new Set(
        rows
          .flatMap(row => getter(row).split(',').map(clean))
          .filter(Boolean)
      )].sort();
    };

    const allMakes = extractUnique(row => row.make);
    filterMake.innerHTML = `<option value="">All OEMs</option>` +
      allMakes.map(m => `<option value="${m}" ${m === selectedMake ? 'selected' : ''}>${m}</option>`).join('');

    const allModels = extractUnique(row => row.model);
    filterModel.innerHTML = `<option value="">All Models</option>` +
      allModels.map(m => `<option value="${m}" ${m === selectedModel ? 'selected' : ''}>${m}</option>`).join('');

    const allOS = extractUnique(row => row.os).filter(v => /^[0-9]{1,2}(\.\d+)?$/.test(v));
    filterOS.innerHTML = `<option value="">All OS</option>` +
      allOS.map(o => `<option value="${o}" ${o === selectedOS ? 'selected' : ''}>${o}</option>`).join('');
  }

  [filterMake, filterModel, filterOS, searchInput].forEach(el => {
    ['input', 'change', 'keyup'].forEach(evt => {
      el.addEventListener(evt, () => {
        updateFilters();
        render();
      });
    });
  });

  function render() {
    const q = searchInput.value.toLowerCase();
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    rows.forEach(row => {
      const matches =
        (!q ||
          row.packageName.toLowerCase().includes(q) ||
          row.appName.toLowerCase().includes(q) ||
          row.make.toLowerCase().includes(q) ||
          row.model.toLowerCase().includes(q) ||
          row.os.toLowerCase().includes(q) ||
          row.alsoKnownBy.toLowerCase().includes(q) ||
          row.userFacing.toLowerCase().includes(q)) &&
        (!selectedMake || row.make.includes(selectedMake)) &&
        (!selectedModel || row.model.includes(selectedModel)) &&
        (!selectedOS || row.os.includes(selectedOS));

      row.element.style.display = matches ? '' : 'none';
    });
  }

  updateFilters();
  render();
}

buildTable();