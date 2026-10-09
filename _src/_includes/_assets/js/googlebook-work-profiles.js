(function () {
  'use strict';

  const calendar = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });

  function calendarDay(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Expected an ISO calendar date');
    const date = new Date(value + 'T00:00:00Z');
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
      throw new Error('Invalid calendar date');
    }
    return date.getTime();
  }

  function londonDate(now) {
    const parts = Object.fromEntries(calendar.formatToParts(now).map(part => [part.type, part.value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function londonMidnight(value) {
    const target = calendarDay(value);
    let instant = target;
    // Resolve London's offset on this date, including BST and the autumn change.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const parts = Object.fromEntries(clock.formatToParts(new Date(instant)).map(part => [part.type, part.value]));
      const local = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
      instant += target - local;
      if (local === target) return new Date(instant).toISOString();
    }
    throw new Error('Could not resolve UK midnight');
  }

  function elapsedTime(startedAt, now = new Date(), supportedAt = null) {
    const start = new Date(startedAt).getTime();
    const end = new Date(supportedAt || now).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end)) throw new Error('Invalid timer timestamp');
    if (supportedAt && end < start) throw new Error('Support date precedes launch');
    const total = Math.max(0, Math.floor((end - start) / 1000));
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor(total / 3600) % 24,
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60
    };
  }

  function timeParts(time) {
    return Object.entries(time).map(([key, value]) => ({
      key,
      value: key === 'days' ? new Intl.NumberFormat('en-GB').format(value) : String(value).padStart(2, '0'),
      label: value === 1 ? key.slice(0, -1) : key
    }));
  }

  function timerLabel(time) {
    return Object.entries(time).map(([key, value]) => `${value} ${value === 1 ? key.slice(0, -1) : key}`).join(', ');
  }

  // Share the timestamp calculation between Eleventy's fallback and the live timer.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { elapsedTime, timeParts, timerLabel, londonMidnight, londonDate };
  }
  if (typeof document === 'undefined') return;

  const tracker = document.querySelector('[data-googlebook-tracker]');
  if (!tracker) return;

  const timer = tracker.querySelector('[data-wait-timer]');
  const startedAt = tracker.dataset.startedAt;
  const supportedAt = tracker.dataset.supportedAt || null;
  const fields = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(key => [key, {
    number: timer.querySelector(`[data-wait-value="${key}"]`),
    unit: timer.querySelector(`[data-wait-unit="${key}"]`)
  }]));

  function refresh() {
    const time = elapsedTime(startedAt, new Date(), supportedAt);
    const parts = timeParts(time);
    // Leave room for three colons, gaps and the proportional font's widest digits.
    const clockWidth = parts.reduce((width, part) => width + part.value.length * 0.8, 2.1);
    timer.style.setProperty('--gb-clock-width', clockWidth);
    const pairWidth = Math.max(
      (parts[0].value.length + parts[1].value.length) * 0.8 + 0.7,
      (parts[2].value.length + parts[3].value.length) * 0.8 + 0.7
    );
    timer.style.setProperty('--gb-pair-width', pairWidth);
    parts.forEach(part => {
      const { number, unit } = fields[part.key];
      if (number.textContent !== part.value) {
        number.textContent = part.value;
      }
      if (unit.textContent !== part.label) unit.textContent = part.label;
    });
    timer.setAttribute('aria-label', timerLabel(time));
  }

  refresh();
  if (!supportedAt) {
    // Timers can pause during sleep or freezing. Always recompute from wall-clock
    // time, and refresh immediately when a page is restored or becomes active.
    window.setInterval(() => { if (!document.hidden) refresh(); }, 1000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) refresh();
    });
    document.addEventListener('resume', refresh);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);

    const caption = tracker.querySelector('[data-wait-caption]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const captions = [
      'dancing with DLP',
      'without work data separation',
      'rocking shadow IT',
      'juggling Chrome installs',
      'giving the feedback app a workout',
      'padding the risk register',
      'hoping the auditor doesn’t ask',
      'putting the briefcase on backorder'
    ];
    let captionIndex = 0;
    if (caption) {
      // Match the project intros' core CSS fade, with a little more reading time.
      window.setInterval(() => {
        if (document.hidden || reducedMotion.matches) return;
        caption.style.opacity = 0;
        window.setTimeout(() => {
          captionIndex = (captionIndex + 1) % captions.length;
          caption.textContent = captions[captionIndex];
          caption.style.opacity = 1;
        }, 500);
      }, 3500);
    }
  }
}());
