const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const { elapsedTime, londonMidnight, timeParts } = require('../_src/_includes/_assets/js/googlebook-work-profiles.js');

const source = fs.readFileSync(path.join(__dirname, '../_src/_includes/_assets/js/googlebook-work-profiles.js'), 'utf8');
const startedAt = '2026-10-03T23:00:00.000Z';

function browser({ now = '2026-10-09T22:59:58Z', supportedAt = '' } = {}) {
  let instant = new Date(now);
  const documentEvents = new Map();
  const windowEvents = new Map();
  const intervals = [];
  const fields = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(key => [key, {
    number: { textContent: '' }, unit: { textContent: '' }
  }]));
  const styles = {};
  const timer = {
    style: { setProperty: (key, value) => { styles[key] = value; } },
    querySelector(selector) {
      const key = selector.match(/"([^"]+)"/)[1];
      return fields[key][selector.includes('data-wait-value') ? 'number' : 'unit'];
    },
    setAttribute(key, value) { this[key] = value; }
  };
  const tracker = {
    dataset: { startedAt, supportedAt },
    querySelector: selector => selector === '[data-wait-timer]' ? timer : null
  };
  const document = {
    hidden: false,
    querySelector: () => tracker,
    addEventListener: (event, handler) => { documentEvents.set(event, handler); }
  };
  class ClockDate extends Date {
    constructor(value) { super(value === undefined ? instant : value); }
    static now() { return instant.getTime(); }
  }
  vm.runInNewContext(source, {
    Date: ClockDate, Intl, document,
    window: {
      setInterval: (handler, milliseconds) => { intervals.push({ handler, milliseconds }); },
      addEventListener: (event, handler) => { windowEvents.set(event, handler); },
      matchMedia: () => ({ matches: false })
    }
  });
  return {
    document, intervals, timer, styles,
    advanceTo(value) { instant = new Date(value); },
    fireDocument(event) { assert.ok(documentEvents.has(event), `Missing document ${event} handler`); documentEvents.get(event)(); },
    fireWindow(event) { assert.ok(windowEvents.has(event), `Missing window ${event} handler`); windowEvents.get(event)({ persisted: true }); },
    read() { return Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, Number(field.number.textContent.replaceAll(',', ''))])); }
  };
}

test('launch is midnight UK time, with continuous elapsed time through the autumn clock change', () => {
  assert.equal(londonMidnight('2026-10-04'), startedAt);
  assert.equal(londonMidnight('2026-10-25'), '2026-10-24T23:00:00.000Z');
  assert.equal(londonMidnight('2026-10-26'), '2026-10-26T00:00:00.000Z');
  assert.deepEqual(elapsedTime(startedAt, londonMidnight('2026-10-26')), { days: 22, hours: 1, minutes: 0, seconds: 0 });
});

test('equivalent instants in different visitor time zones produce the same count', () => {
  const expected = { days: 5, hours: 11, minutes: 34, seconds: 56 };
  for (const now of ['2026-10-09T11:34:56+01:00', '2026-10-09T03:34:56-07:00', '2026-10-09T10:34:56Z']) {
    assert.deepEqual(elapsedTime(startedAt, now), expected);
  }
});

test('a delayed first tick catches up after sleep without replaying missed ticks', () => {
  const page = browser();
  assert.deepEqual(page.read(), { days: 5, hours: 23, minutes: 59, seconds: 58 });
  page.advanceTo('2026-10-10T07:20:03Z');
  assert.equal(page.intervals[0].milliseconds, 1000);
  page.intervals[0].handler();
  assert.deepEqual(page.read(), { days: 6, hours: 8, minutes: 20, seconds: 3 });
});

for (const [target, event] of [['document', 'resume'], ['window', 'pageshow'], ['window', 'focus']]) {
  test(`${event} catches up immediately without waiting for an interval callback`, () => {
    const page = browser();
    page.advanceTo('2026-10-12T05:06:07Z');
    if (target === 'document') page.fireDocument(event);
    else page.fireWindow(event);
    assert.deepEqual(page.read(), { days: 8, hours: 6, minutes: 6, seconds: 7 });
    assert.equal(page.timer['aria-label'], '8 days, 6 hours, 6 minutes, 7 seconds');
    assert.equal(page.intervals.length, 1, 'Resuming must not create more ticking intervals');
  });
}

test('hidden tabs pause rendering and catch up when visible again', () => {
  const page = browser();
  const before = page.read();
  page.document.hidden = true;
  page.advanceTo('2026-10-10T11:12:13Z');
  page.intervals[0].handler();
  page.fireDocument('visibilitychange');
  assert.deepEqual(page.read(), before);
  page.document.hidden = false;
  page.fireDocument('visibilitychange');
  assert.deepEqual(page.read(), { days: 6, hours: 12, minutes: 12, seconds: 13 });
});

test('reloading a discarded page replaces stale build-time values immediately', () => {
  const page = browser({ now: '2026-10-13T07:08:09Z' });
  assert.deepEqual(page.read(), { days: 9, hours: 8, minutes: 8, seconds: 9 });
});

test('second, minute and day boundaries are recalculated exactly', () => {
  const page = browser();
  for (const [now, expected] of [
    ['2026-10-09T22:59:59Z', { days: 5, hours: 23, minutes: 59, seconds: 59 }],
    ['2026-10-09T23:00:00Z', { days: 6, hours: 0, minutes: 0, seconds: 0 }],
    ['2026-10-09T23:01:00Z', { days: 6, hours: 0, minutes: 1, seconds: 0 }]
  ]) {
    page.advanceTo(now);
    page.intervals[0].handler();
    assert.deepEqual(page.read(), expected);
  }
});

test('clock adjustments are reflected and pre-launch dates cannot go negative', () => {
  const page = browser();
  page.advanceTo('2026-10-08T00:00:00Z');
  page.fireWindow('focus');
  assert.deepEqual(page.read(), { days: 4, hours: 1, minutes: 0, seconds: 0 });
  page.advanceTo('2026-10-03T22:59:59Z');
  page.fireWindow('focus');
  assert.deepEqual(page.read(), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test('retired trackers stay frozen regardless of the visitor clock', () => {
  const page = browser({ now: '2030-01-01T00:00:00Z', supportedAt: londonMidnight('2026-10-09') });
  assert.deepEqual(page.read(), { days: 5, hours: 0, minutes: 0, seconds: 0 });
  assert.equal(page.intervals.length, 0);
});

test('sizing is refreshed when a long suspended period increases the day count', () => {
  const page = browser();
  const before = page.styles['--gb-pair-width'];
  page.advanceTo('2054-02-20T00:00:00Z');
  page.fireDocument('resume');
  assert.equal(page.read().days, 10001);
  assert.ok(page.styles['--gb-pair-width'] > before);
});

test('invalid launch/support dates fail rather than showing a misleading timer', () => {
  assert.throws(() => londonMidnight('2026-02-30'));
  assert.throws(() => elapsedTime(startedAt, 'invalid'));
  assert.throws(() => elapsedTime(startedAt, new Date(), '2026-10-02T00:00:00Z'));
});

test('single-unit labels remain meaningful after resuming', () => {
  assert.deepEqual(timeParts({ days: 1, hours: 1, minutes: 1, seconds: 1 }).map(part => part.label), ['day', 'hour', 'minute', 'second']);
});
