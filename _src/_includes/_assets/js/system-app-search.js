async function buildTable() {
  const tableBody = document.querySelector('#appTable tbody');
  const searchInput = document.getElementById('searchInput');
  const filterMake = document.getElementById('filterMake');
  const filterModel = document.getElementById('filterModel');
  const filterOS = document.getElementById('filterOS');

  // Build rows from window.packages, linking to table elements
  const rows = [];
  for (const [pkg, entry] of Object.entries(window.packages)) {
    // Create comma-separated lists as rendered in the table
    const makes = Array.from(new Set(entry.devices.map(d => d.make))).join(', ');
    const models = Array.from(new Set(entry.devices.map(d => d.model))).join(', ');
    const oses = Array.from(new Set(entry.devices.map(d => d.os))).join(', ');
    const alsoKnownBy = entry.additionalLocales && entry.additionalLocales.length
      ? entry.additionalLocales.map(alt => alt.name).join(', ')
      : '';

    // Find the TR element for rendering
    const tr = Array.from(tableBody.children).find(tr =>
      tr.children[1] && tr.children[1].textContent.replace(/`/g,'').trim() === pkg
    );

    rows.push({
      element: tr,
      packageName: pkg,
      appName: entry.appName,
      make: makes,
      model: models,
      os: oses,
      alsoKnownBy: alsoKnownBy,
      userFacing: entry.userFacing ? entry.userFacing.toString().toLowerCase() : ''
    });
  }

  function updateFilters() {
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    // Start with all deviceAppMatrix, filter down as selections are made
    let filteredDevices = window.deviceAppMatrix;
    if (selectedMake) filteredDevices = filteredDevices.filter(d => d.make === selectedMake);
    if (selectedModel) filteredDevices = filteredDevices.filter(d => d.model === selectedModel);
    if (selectedOS) filteredDevices = filteredDevices.filter(d => d.os === selectedOS);

    // Build valid dropdown options from filteredDevices
    const makes = [...new Set(filteredDevices.map(d => d.make))].sort();
    const models = [...new Set(filteredDevices.map(d => d.model))].sort();
    const oses = [...new Set(filteredDevices.map(d => d.os))].sort();

    filterMake.innerHTML = `<option value="">All OEMs</option>` +
      makes.map(m => `<option value="${m}" ${m === selectedMake ? 'selected' : ''}>${m}</option>`).join('');
    filterModel.innerHTML = `<option value="">All Models</option>` +
      models.map(m => `<option value="${m}" ${m === selectedModel ? 'selected' : ''}>${m}</option>`).join('');
    filterOS.innerHTML = `<option value="">All OS</option>` +
      oses.map(o => `<option value="${o}" ${o === selectedOS ? 'selected' : ''}>${o}</option>`).join('');
  }

  [filterMake, filterModel, filterOS, searchInput].forEach(el => {
    ['input', 'change', 'keyup'].forEach(evt => {
      el.addEventListener(evt, () => {
        updateFilters();
        currentPage = 1; // Reset to page 1 on filter/search change
        itemsPerPage = itemsPerPageSelect.value === 'all' ? Infinity : parseInt(itemsPerPageSelect.value);
        render();
      });
    });
  });

  let currentPage = 1;
  let itemsPerPageSelect = document.getElementById('itemsPerPage');
  let itemsPerPage = itemsPerPageSelect?.value === 'all' ? Infinity : parseInt(itemsPerPageSelect?.value || '100');

  const paginationContainer = document.getElementById('pagination');
  // const itemsPerPageSelect = document.getElementById('itemsPerPage'); // Already declared above

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (!paginationContainer) return;

    let html = '';
    if (totalPages > 1) {
      html += `<a href="#" data-page="${currentPage - 1}" class="${currentPage === 1 ? 'disabled' : ''}">&lt;</a>`;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
          html += `<a href="#" data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
        } else if (i === 2 && currentPage > 4) {
          html += `<span>...</span>`;
        } else if (i === totalPages - 1 && currentPage < totalPages - 3) {
          html += `<span>...</span>`;
        }
      }
      html += `<a href="#" data-page="${currentPage + 1}" class="${currentPage === totalPages ? 'disabled' : ''}">&gt;</a>`;
    }

    paginationContainer.innerHTML = html;
    paginationContainer.querySelectorAll('a[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = parseInt(btn.dataset.page);
        render();
      });
    });
  }

  if (itemsPerPageSelect) {
    itemsPerPageSelect.addEventListener('change', () => {
      itemsPerPage = itemsPerPageSelect.value === 'all' ? Infinity : parseInt(itemsPerPageSelect.value);
      currentPage = 1;
      render();
    });
  }

  function render() {
    const q = searchInput.value.toLowerCase();
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    const filteredRows = rows.filter(row => {
      const matches =
        (!q ||
          row.packageName.toLowerCase().includes(q) ||
          row.appName.toLowerCase().includes(q) ||
          row.make.toLowerCase().includes(q) ||
          row.model.toLowerCase().includes(q) ||
          row.os.toLowerCase().includes(q) ||
          row.alsoKnownBy.toLowerCase().includes(q) ||
          row.userFacing.toLowerCase().includes(q)) &&
        (!selectedMake || row.make.split(',').map(s => s.trim()).includes(selectedMake)) &&
        (!selectedModel || row.model.split(',').map(s => s.trim()).includes(selectedModel)) &&
        (!selectedOS || row.os.split(',').map(s => s.trim()).includes(selectedOS));

      return matches;
    });

    rows.forEach(row => {
      row.element.style.display = 'none';
    });

    const visibleRows = itemsPerPage === Infinity
      ? filteredRows
      : filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    visibleRows.forEach(row => {
      row.element.style.display = '';
    });

    renderPagination(filteredRows.length);
  }

  updateFilters();
  render();
}

buildTable();