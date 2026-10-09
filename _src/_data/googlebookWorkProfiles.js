const { elapsedTime, timeParts, timerLabel, londonMidnight, londonDate } = require('../_includes/_assets/js/googlebook-work-profiles.js');

module.exports = () => {
  // First retail availability anywhere, not the announcement or UK launch.
  const startedOn = '2026-10-04';
  // Set only after supported Android Enterprise work-profile enrolment is available.
  // Add the confirming source and recheck the contextual copy when retiring this tracker.
  const supportedOn = null;
  const lastCheckedOn = '2026-10-09';
  const now = new Date();
  const startedAt = londonMidnight(startedOn);
  const supportedAt = supportedOn ? londonMidnight(supportedOn) : null;
  const time = elapsedTime(startedAt, now, supportedAt);
  const dateLabel = value => new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(value + 'T00:00:00Z'));

  return {
    startedOn, startedAt, supportedOn, supportedAt, lastCheckedOn,
    timeParts: timeParts(time), timerLabel: timerLabel(time),
    startedLabel: dateLabel(startedOn),
    supportedLabel: supportedOn ? dateLabel(supportedOn) : null,
    lastCheckedLabel: dateLabel(lastCheckedOn),
    builtOn: londonDate(now),
    builtLabel: dateLabel(londonDate(now)),
    supportSource: 'https://support.google.com/googlebook/answer/18178630?hl=en',
    roadmapSource: 'https://support.google.com/chrome/a/answer/16634428?hl=en',
    launchSource: 'https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/'
  };
};
