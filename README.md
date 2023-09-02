# manual (requires repo clone)

`npm ci` to install packages

then run `node sync-context-ids.js <gradebook_export.csv> <output.csv>` which will populate the gradebook with LTI IDs.

# docker (pushed to dockerhub)

the below command works on linux and probably macos -- the `pwd` syntax will need to be changed on windows

needs `COURSE_ID`, `BASE_URL`, and `API_KEY` enviroment variables, then the two final args should have their filenames updated based on your gradebook filename in the current working directory.

```
docker run \
  -v `pwd`:/app/csv \
  -e COURSE_ID=xxxx \
  -e BASE_URL=https://bcourses.berkeley.edu \
  -e API_KEY=xxxx~xxxx \
  -it timothyaveni/canvas-lti-id-populate \
  /app/csv/gradebook.csv \
  /app/csv/gradebook-out.csv \
```

# PrairieLearn note

PrairieLearn IDs will have a suffix `@<tool_id>::ciid=##` -- I used a spreadsheet formula to tack this onto each LTI ID. PL /gradebook page shows each student's UID, and all of those will have the same suffix.
