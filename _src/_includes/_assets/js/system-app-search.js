async function buildTable() {
  const tableBody = document.querySelector('#appTable tbody');
  const searchInput = document.getElementById('searchInput');
  const filterMake = document.getElementById('filterMake');
  const filterModel = document.getElementById('filterModel');
  const filterOS = document.getElementById('filterOS');

  if (!tableBody || !searchInput || !filterMake || !filterModel || !filterOS) {
    return;
  }

  // Case-insensitive unique helper for arrays of strings
  function uniqueCaseInsensitive(list) {
    const map = new Map();
    for (const raw of list) {
      if (raw === undefined || raw === null) continue;
      const val = String(raw).trim();
      if (!val) continue;
      const lc = val.toLowerCase();
      if (!map.has(lc)) {
        map.set(lc, val); // preserve first-seen capitalisation
      }
    }
    return Array.from(map.values());
  }

  // Case-insensitive unique helper for values from deviceAppMatrix
  function buildUniqueValues(devices, key) {
    const map = new Map();
    for (const d of devices) {
      if (!d || d[key] === undefined || d[key] === null) continue;
      const val = String(d[key]).trim();
      if (!val) continue;
      const lc = val.toLowerCase();
      if (!map.has(lc)) {
        map.set(lc, val);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }

  // Update the "across N OEMs" badge
  const oemCountSpan = document.getElementById('oemCount');
  if (oemCountSpan && Array.isArray(window.deviceAppMatrix)) {
    const oemCount = uniqueCaseInsensitive(window.deviceAppMatrix.map(d => d.make)).length;
    oemCountSpan.textContent = oemCount;
  }

  // Utility to create a cell with a scrollable div (OEM, Model, OS, Also known by)
  function createScrollableCell(text) {
    const td = document.createElement('td');
    const div = document.createElement('div');
    div.className = 'scrollable';
    div.textContent = text || '';
    td.appendChild(div);
    return td;
  }

  // Build rows from window.packages and render them into the table
  const rows = [];

  for (const [pkg, entry] of Object.entries(window.packages || {})) {
    const devices = Array.isArray(entry.devices) ? entry.devices : [];

    // Create comma-separated lists using case-insensitive uniqueness
    const makesArray = uniqueCaseInsensitive(devices.map(d => d.make));
    const modelsArray = uniqueCaseInsensitive(devices.map(d => d.model));
    const osArray = uniqueCaseInsensitive(devices.map(d => d.os));

    const makes = makesArray.join(', ');
    const models = modelsArray.join(', ');
    const oses = osArray.join(', ');

    const alsoKnownBy = entry.additionalLocales && entry.additionalLocales.length
      ? entry.additionalLocales.map(alt => alt.name).join(', ')
      : '';

    const appName = (entry.appName || pkg).toString();

    const userFacingDisplay = entry.userFacing !== undefined && entry.userFacing !== null
      ? String(entry.userFacing)
      : '';

    // Preserve previous search semantics: only "true" becomes searchable, false/undefined are empty
    const userFacingSearch = entry.userFacing ? entry.userFacing.toString().toLowerCase() : '';

    // Create table row and cells
    const tr = document.createElement('tr');

    const tdAppName = document.createElement('td');
    tdAppName.textContent = appName;
    tr.appendChild(tdAppName);

    const tdPackage = document.createElement('td');
    const code = document.createElement('code');
    code.textContent = pkg;
    tdPackage.appendChild(code);
    tr.appendChild(tdPackage);

    tr.appendChild(createScrollableCell(makes));
    tr.appendChild(createScrollableCell(models));
    tr.appendChild(createScrollableCell(oses));
    tr.appendChild(createScrollableCell(alsoKnownBy));

    const tdUserFacing = document.createElement('td');
    tdUserFacing.textContent = userFacingDisplay;
    tr.appendChild(tdUserFacing);

    tableBody.appendChild(tr);

    rows.push({
      element: tr,
      packageName: pkg,
      appName: appName,
      make: makes,
      model: models,
      os: oses,
      alsoKnownBy: alsoKnownBy,
      userFacing: userFacingSearch
    });
  }

  function updateFilters(activeFilter = null) {
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    const baseDevices = window.deviceAppMatrix || [];

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

    const makes = buildUniqueValues(makeDevices, 'make');
    const models = buildUniqueValues(modelDevices, 'model');
    const oses = buildUniqueValues(osDevices, 'os');

    if (activeFilter !== 'make') {
      const current = filterMake.value;
      filterMake.innerHTML = `<option value="">All OEMs</option>` +
        makes.map(m => `<option value="${m}" ${m === current ? 'selected' : ''}>${m}</option>`).join('');
    }
    if (activeFilter !== 'model') {
      const current = filterModel.value;
      filterModel.innerHTML = `<option value="">All Models</option>` +
        models.map(m => `<option value="${m}" ${m === current ? 'selected' : ''}>${m}</option>`).join('');
    }
    if (activeFilter !== 'os') {
      const current = filterOS.value;
      filterOS.innerHTML = `<option value="">All OS</option>` +
        oses.map(o => `<option value="${o}" ${o === current ? 'selected' : ''}>${o}</option>`).join('');
    }
  }

  // Shared pagination state
  let currentPage = 1;
  const itemsPerPageSelect = document.getElementById('itemsPerPage');
  let itemsPerPage = itemsPerPageSelect?.value === 'all'
    ? Infinity
    : parseInt(itemsPerPageSelect?.value || '100', 10);

  const paginationContainer = document.getElementById('pagination');

  function renderPagination(totalItems) {
    if (!paginationContainer) return;

    const totalPages = itemsPerPage === Infinity
      ? 1
      : Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = '';

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

    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('a[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextPage = parseInt(btn.dataset.page, 10);
        if (!Number.isNaN(nextPage) && nextPage >= 1 && nextPage <= totalPages && nextPage !== currentPage) {
          currentPage = nextPage;
          render();
        }
      });
    });
  }

  if (itemsPerPageSelect) {
    itemsPerPageSelect.addEventListener('change', () => {
      itemsPerPage = itemsPerPageSelect.value === 'all'
        ? Infinity
        : parseInt(itemsPerPageSelect.value || '100', 10);
      currentPage = 1;
      render();
    });
  }

  function render() {
    const q = (searchInput.value || '').toLowerCase();
    const selectedMake = filterMake.value;
    const selectedModel = filterModel.value;
    const selectedOS = filterOS.value;

    const selectedMakeLC = selectedMake.toLowerCase();
    const selectedModelLC = selectedModel.toLowerCase();
    const selectedOSLC = selectedOS.toLowerCase();

    const filteredRows = rows.filter(row => {
      const matchesText =
        !q ||
        row.packageName.toLowerCase().includes(q) ||
        row.appName.toLowerCase().includes(q) ||
        row.make.toLowerCase().includes(q) ||
        row.model.toLowerCase().includes(q) ||
        row.os.toLowerCase().includes(q) ||
        row.alsoKnownBy.toLowerCase().includes(q) ||
        row.userFacing.toLowerCase().includes(q);

      const matchesMake = !selectedMakeLC ||
        row.make.split(',').map(s => s.trim().toLowerCase()).includes(selectedMakeLC);
      const matchesModel = !selectedModelLC ||
        row.model.split(',').map(s => s.trim().toLowerCase()).includes(selectedModelLC);
      const matchesOS = !selectedOSLC ||
        row.os.split(',').map(s => s.trim().toLowerCase()).includes(selectedOSLC);

      return matchesText && matchesMake && matchesModel && matchesOS;
    });

    // Hide all rows first
    rows.forEach(row => {
      row.element.style.display = 'none';
    });

    // Determine which rows should be visible on the current page
    const visibleRows = itemsPerPage === Infinity
      ? filteredRows
      : filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    visibleRows.forEach(row => {
      row.element.style.display = '';
    });

    renderPagination(filteredRows.length);
  }

  // Wire up filter and search events
  [filterMake, filterModel, filterOS, searchInput].forEach(el => {
    ['input', 'change', 'keyup'].forEach(evt => {
      el.addEventListener(evt, () => {
        updateFilters();
        currentPage = 1;
        itemsPerPage = itemsPerPageSelect?.value === 'all'
          ? Infinity
          : parseInt(itemsPerPageSelect.value || '100', 10);
        render();
      });
    });
  });

  // Initial render
  updateFilters();
  render();
}

buildTable();