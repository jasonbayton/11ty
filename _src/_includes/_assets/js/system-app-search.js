function uniqueCaseInsensitive(values) {
  const seen = new Set();
  for (const v of values) {
    if (typeof v === 'string') {
      seen.add(v.toLowerCase());
    }
  }
  return Array.from(seen);
}

function buildTable() {
  const table = document.getElementById('appTable');
  const searchInput = document.getElementById('searchInput');
  const filterMake = document.getElementById('filterMake');
  const filterModel = document.getElementById('filterModel');
  const filterOS = document.getElementById('filterOS');

  // Update the "across N OEMs" badge if present
  const oemCountSpan = document.getElementById('oemCount');
  if (oemCountSpan && Array.isArray(window.deviceAppMatrix)) {
    const oemCount = uniqueCaseInsensitive(window.deviceAppMatrix.map(d => d.make)).length;
    oemCountSpan.textContent = oemCount;
  }

  // Create the JS-driven tbody, replacing the server-rendered one
  const tbody = document.createElement('tbody');
  const noJsTbody = table.querySelector('.no-js-table');
  if (noJsTbody) noJsTbody.remove();
  table.appendChild(tbody);

  // Build row data from window.packages (no DOM matching)
  const rows = [];
  for (const [pkg, entry] of Object.entries(window.packages)) {
    const makesArr = [...new Set(entry.devices.map(d => d.make))];
    const modelsArr = [...new Set(entry.devices.map(d => d.model))];
    const osesArr = [...new Set(entry.devices.map(d => d.os))];
    const alsoKnownBy = entry.additionalLocales && entry.additionalLocales.length
      ? entry.additionalLocales.map(alt => alt.name).join(', ')
      : '';

    rows.push({
      packageName: pkg,
      appName: entry.appName || pkg,
      makesArr,
      modelsArr,
      osesArr,
      make: makesArr.join(', '),
      model: modelsArr.join(', '),
      os: osesArr.join(', '),
      alsoKnownBy,
      userFacing: entry.userFacing ? 'true' : ''
    });
  }

  // Pre-compute lowercase values for search
  const searchableRows = rows.map(row => ({
    row,
    searchText: [
      row.packageName, row.appName, row.make, row.model,
      row.os, row.alsoKnownBy, row.userFacing
    ].join(' ').toLowerCase()
  }));

  function updateFilters(activeFilter) {
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    const baseDevices = window.deviceAppMatrix;

    const makeDevices = baseDevices.filter(d =>
      (!selectedModel || d.model === selectedModel) &&
      (!selectedOS || d.os === selectedOS)
    );
    const modelDevices = baseDevices.filter(d =>
      (!selectedMake || d.make === selectedMake) &&
      (!selectedOS || d.os === selectedOS)
    );
    const osDevices = baseDevices.filter(d =>
      (!selectedMake || d.make === selectedMake) &&
      (!selectedModel || d.model === selectedModel)
    );

    const makes = [...new Set(makeDevices.map(d => d.make))].sort();
    const models = [...new Set(modelDevices.map(d => d.model))].sort();
    const oses = [...new Set(osDevices.map(d => d.os))].sort();

    if (activeFilter !== 'make') {
      filterMake.innerHTML = `<option value="">All OEMs</option>` +
        makes.map(m => `<option value="${escapeHtml(m)}" ${m === selectedMake ? 'selected' : ''}>${escapeHtml(m)}</option>`).join('');
    }
    if (activeFilter !== 'model') {
      filterModel.innerHTML = `<option value="">All Models</option>` +
        models.map(m => `<option value="${escapeHtml(m)}" ${m === selectedModel ? 'selected' : ''}>${escapeHtml(m)}</option>`).join('');
    }
    if (activeFilter !== 'os') {
      filterOS.innerHTML = `<option value="">All OS</option>` +
        oses.map(o => `<option value="${escapeHtml(o)}" ${o === selectedOS ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('');
    }
  }

  // Debounce for search input
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage = 1;
      render();
    }, 150);
  });

  // Filters only need 'change' event
  const filterMap = [[filterMake, 'make'], [filterModel, 'model'], [filterOS, 'os']];
  filterMap.forEach(([el, name]) => {
    el.addEventListener('change', () => {
      updateFilters(name);
      currentPage = 1;
      render();
    });
  });

  let currentPage = 1;
  const itemsPerPageSelect = document.getElementById('itemsPerPage');
  let itemsPerPage = itemsPerPageSelect?.value === 'all' ? Infinity : parseInt(itemsPerPageSelect?.value || '50');

  const paginationContainer = document.getElementById('pagination');

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
        const page = parseInt(btn.dataset.page);
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        if (isNaN(page) || page < 1 || page > totalPages) return;
        currentPage = page;
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

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render() {
    const q = searchInput.value.toLowerCase();
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    // Filter rows
    const filteredRows = searchableRows.filter(({ row, searchText }) => {
      return (!q || searchText.includes(q)) &&
        (!selectedMake || row.makesArr.includes(selectedMake)) &&
        (!selectedModel || row.modelsArr.includes(selectedModel)) &&
        (!selectedOS || row.osesArr.includes(selectedOS));
    });

    // Paginate
    const visibleRows = itemsPerPage === Infinity
      ? filteredRows
      : filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Build HTML only for visible rows
    let html = '';
    for (const { row } of visibleRows) {
      html += '<tr>'
        + `<td>${escapeHtml(row.appName)}</td>`
        + `<td><code>${escapeHtml(row.packageName)}</code></td>`
        + `<td><div class="scrollable">${escapeHtml(row.make)}</div></td>`
        + `<td><div class="scrollable">${escapeHtml(row.model)}</div></td>`
        + `<td><div class="scrollable">${escapeHtml(row.os)}</div></td>`
        + `<td><div class="scrollable">${escapeHtml(row.alsoKnownBy)}</div></td>`
        + `<td>${escapeHtml(row.userFacing)}</td>`
        + '</tr>';
    }

    tbody.innerHTML = html;
    renderPagination(filteredRows.length);
  }

  updateFilters();
  render();

  // Pagination for contributing devices table
  function initDevicePagination() {
    const deviceTableBody = document.querySelector('#deviceTable tbody');
    const devicePagination = document.getElementById('devicePagination');
    if (!deviceTableBody || !devicePagination) return;

    const deviceRows = Array.from(deviceTableBody.rows);
    const deviceItemsPerPageSelect = document.getElementById('deviceItemsPerPage');
    let deviceItemsPerPage = deviceItemsPerPageSelect?.value === 'all'
      ? Infinity
      : parseInt(deviceItemsPerPageSelect?.value || '20', 10);
    let deviceCurrentPage = 1;

    function renderDevicePage() {
      const totalPages = Math.ceil(deviceRows.length / deviceItemsPerPage) || 1;

      deviceRows.forEach((row, index) => {
        const start = (deviceCurrentPage - 1) * deviceItemsPerPage;
        const end = start + deviceItemsPerPage;
        row.style.display = (index >= start && index < end) ? '' : 'none';
      });

      let html = '';
      if (totalPages > 1) {
        html += `<a href="#" data-page="${deviceCurrentPage - 1}" class="${deviceCurrentPage === 1 ? 'disabled' : ''}">&lt;</a>`;
        for (let i = 1; i <= totalPages; i++) {
          html += `<a href="#" data-page="${i}" class="${i === deviceCurrentPage ? 'active' : ''}">${i}</a>`;
        }
        html += `<a href="#" data-page="${deviceCurrentPage + 1}" class="${deviceCurrentPage === totalPages ? 'disabled' : ''}">&gt;</a>`;
      }

      devicePagination.innerHTML = html;

      devicePagination.querySelectorAll('a[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const page = parseInt(btn.dataset.page, 10);
          const totalPages = Math.ceil(deviceRows.length / deviceItemsPerPage) || 1;
          if (isNaN(page) || page < 1 || page > totalPages || page === deviceCurrentPage) return;
          deviceCurrentPage = page;
          renderDevicePage();
        });
      });
    }

    if (deviceItemsPerPageSelect) {
      deviceItemsPerPageSelect.addEventListener('change', () => {
        deviceItemsPerPage = deviceItemsPerPageSelect.value === 'all'
          ? Infinity
          : parseInt(deviceItemsPerPageSelect.value || '20', 10);
        deviceCurrentPage = 1;
        renderDevicePage();
      });
    }

    renderDevicePage();
  }

  initDevicePagination();
}

buildTable();
