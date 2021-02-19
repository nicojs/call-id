import fs from 'fs';
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const testDir = path.resolve(dirname, '..', 'test');
const templatesDir = path.resolve(testDir, 'templates');
const outDir = path.resolve(testDir, 'generated');
const actualTestsFile = path.resolve(testDir, 'tests.js');

async function generate() {
  const actualTests = await fs.promises.readFile(actualTestsFile, 'utf-8');
  const files = await fs.promises.readdir(templatesDir);
  await fs.promises.mkdir(outDir, { recursive: true });
  for await (const file of files) {
    const inputFileName = path.resolve(templatesDir, file);
    const outputFileName = path.resolve(outDir, path.parse(file).name);
    const content = await fs.promises.readFile(inputFileName, 'utf-8');
    await fs.promises.writeFile(
      outputFileName,
      content.replace('%TESTS%', actualTests)
    );
  }
  console.log('✅ Generated tests');
}

generate()
  .then(() => {
    if (process.argv.includes('-w')) {
      console.log('Watching test files for changes');
      const watchFiles = [
        actualTestsFile,
        ...fs
          .readdirSync(templatesDir)
          .map((file) => path.resolve(templatesDir, file)),
      ];
      watchFiles.forEach((file) => {
        console.log(`- ${file}`);
        const onChanged = () => {
          console.log(`${path.basename(file)} changed`);
          generate().catch((err) => {
            console.error(err);
            watchFiles.forEach((file) => fs.unwatchFile(file, onChanged));
            process.exitCode = 1;
          });
        };
        fs.watchFile(file, { interval: 20 }, onChanged);
      });
    }
  })
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
