// src/prisma/seed.ts
import { db } from './db';

const JOB_TITLES_URL =
  'https://raw.githubusercontent.com/jneidel/job-titles/master/job-titles.json';

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  console.log('Fetching real job titles...');
  const response = await fetch(JOB_TITLES_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch job titles: ${response.statusText}`);
  }

  const data: { 'job-titles': string[] } = await response.json();

  const formattedTitles = Array.from(
    new Set(
      data['job-titles']
        .map((title) =>
          title.trim().replace(/\b\w/g, (char) => char.toUpperCase())
        )
        .filter(Boolean)
    )
  );

  // Batch into chunks of 500 to stay well within pg wire-protocol bind limits
  const batches = chunkArray(formattedTitles, 500);

  for (let i = 0; i < batches.length; i++) {
    await db.orm.public.Jobs.createAll(
      batches[i].map((title) => ({ title }))
    );
    console.log(`Inserted batch ${i + 1}/${batches.length}`);
  }

  console.log(`Done! Seeded ${formattedTitles.length} real job titles into Jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });