const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Moments JSON file or images base folder not informed!');
  process.exit(1);
}

if (!fs.existsSync(args[0])) {
  console.error('Invalid Moments JSON file path.');
  process.exit(1);
}

if (!fs.existsSync(args[1])) {
  console.error('Invalid images base folder path.');
  process.exit(1);
}

if (!fs.lstatSync(args[1]).isDirectory()) {
  console.error('Informed images base folder path not a directory.');
  process.exit(1);
}

const jsonFile = fs.lstatSync(args[0]).isFile() ? args[0] : `${args[0]}/moments.json`;
const imagesPath = args[1];
const json = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

Object.keys(json.moments).forEach(index => json.moments[index].photos.forEach(photo => {
  const image = path.join(imagesPath, photo.uri);

  if (fs.existsSync(image)) {
    const datetime = timestampConverter(photo.creation_timestamp);
    const command = `exiftool -AllDates="${datetime}" '${image}'`;
    const result = exec(command).toString();
    console.log(result);
  }
}));

function timestampConverter(timestamp) {
  return new Date(timestamp * 1000).toISOString();
}