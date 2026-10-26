(function () {
  'use strict';
  var enabled = document.currentScript && document.currentScript.getAttribute('data-progress') === 'true';
  window.mikaProgressEnabled = enabled && typeof ReadableStream !== 'undefined' && typeof TextDecoder !== 'undefined';
  window.mikaTextRequest = function (payload, onProgress) {
    var streaming = window.mikaProgressEnabled;
    return fetch(streaming ? '/api/orb-chat-progress' : '/api/orb-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (response) {
      if (!(response.headers.get('content-type') || '').includes('text/event-stream')) {
        return response.json().then(function (data) { return { ok: response.ok, data: data }; });
      }
      if (!response.body || !response.body.getReader) throw Error('Progress connection unavailable');
      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '', result = null;
      function frames() {
        var end;
        while ((end = buffer.indexOf('\n\n')) !== -1) {
          var frame = buffer.slice(0, end); buffer = buffer.slice(end + 2);
          var type = '', data = '';
          frame.split('\n').forEach(function (line) {
            if (line.indexOf('event: ') === 0) type = line.slice(7);
            if (line.indexOf('data: ') === 0) data += line.slice(6);
          });
          if (!data) continue;
          var value = JSON.parse(data);
          if (type === 'progress' && !result && onProgress) { try { onProgress(value.stage, value); } catch (e) {} }
          if (type === 'complete') result = value;
        }
      }
      function read() {
        return reader.read().then(function (chunk) {
          buffer += decoder.decode(chunk.value, { stream: !chunk.done });
          frames();
          if (chunk.done) {
            if (!result) throw Error('Progress connection interrupted');
            return result;
          }
          return read();
        });
      }
      return read().finally(function () { reader.releaseLock(); });
    });
  };
  window.mikaProgressLabel = function (stage) {
    return { index: 'Loading the documentation', search: 'Searching the documentation', search_done: 'Documentation search complete', read_done: 'Documentation page read', review: 'Reviewing the information', read: 'Reading a documentation page', system_apps: 'Checking the system app database', external: 'Checking an external reference' }[stage] || '';
  };
  window.mikaUpdateProgress = function (element, stage, details) {
    if (!element) return;
    details = details || {};
    var label = window.mikaProgressLabel(stage);
    if (!label) return;
    var state = element._mikaProgress || (element._mikaProgress = {});
    if (stage === 'search_done') {
      if (Number.isInteger(details.matches) && details.matches >= 0 && details.matches <= 20) state.matches = details.matches;
      state.match = Array.isArray(details.titles) && typeof details.titles[0] === 'string' ? details.titles[0].slice(0, 120) : '';
    }
    if (stage === 'read_done' && Array.isArray(details.titles) && typeof details.titles[0] === 'string') state.read = details.titles[0].slice(0, 120);
    if (stage === 'read') state.activity = 'Documentation page lookup';
    if (stage === 'system_apps') state.activity = 'System app database lookup';
    if (stage === 'external') state.activity = 'External reference lookup';
    var lines = [];
    if (typeof state.matches === 'number') lines.push(state.matches + (state.matches === 1 ? ' search result loaded' : ' search results loaded'));
    if (state.read) lines.push('Read: ' + state.read);
    else if (state.match) lines.push('First result: ' + state.match);
    if (state.activity && stage === 'review' && !state.read) lines.push(state.activity);
    lines.push(label);
    element.style.whiteSpace = 'pre-line';
    element.textContent = lines.join('\n');
  };
})();
