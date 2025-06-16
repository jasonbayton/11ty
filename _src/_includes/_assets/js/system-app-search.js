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
        (!selectedMake || row.make.split(',').map(s => s.trim()).includes(selectedMake)) &&
        (!selectedModel || row.model.split(',').map(s => s.trim()).includes(selectedModel)) &&
        (!selectedOS || row.os.split(',').map(s => s.trim()).includes(selectedOS));

      row.element.style.display = matches ? '' : 'none';
    });
  }

  updateFilters();
  render();
}

buildTable();