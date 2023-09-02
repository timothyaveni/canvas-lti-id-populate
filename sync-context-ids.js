import canvasApiRequest from './canvas-api-request.js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

if (process.argv.length !== 4) {
  console.error('Usage: node sync-context-ids.js <gradebook.csv> <output.csv>');
  process.exit(1);
}

const gradebookStudents = parse(fs.readFileSync(process.argv[2]), { columns: true });

const canvasStudents = await canvasApiRequest(
  '/users?include[]=lti_id&per_page=50',
  a => a,
);

let processedStudents = 0;

for (const gs of gradebookStudents) {
  const student = canvasStudents.find(cs => cs.id.toString() === gs.ID.toString());
  if (student) {
    gs.lti_id = student.lti_id;
    processedStudents++;
  } else {
    gs.lti_id = '';
    console.error(`No student found in Canvas -- ${gs.ID, gs.Student}`);
  }
}

fs.writeFileSync(
  process.argv[3],
  stringify(gradebookStudents, { header: true }),
);

console.log(`Processed ${processedStudents} students. Wrote to ${process.argv[3]}`);