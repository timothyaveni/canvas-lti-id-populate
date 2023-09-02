`npm ci` to install packages

then run `node sync-context-ids.js <gradebook_export.csv> <output.csv>` which will populate the gradebook with LTI IDs.

PrairieLearn IDs will have a suffix `@<tool_id>::ciid=##` -- I used a spreadsheet formula to tack this onto each LTI ID. PL /gradebook page shows each student's UID, and all of those will have the same suffix.
