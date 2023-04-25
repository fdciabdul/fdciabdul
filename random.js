const fs = require('fs');
const axios = require('axios');

async function getRandomAyah() {
  const apiUrl = 'https://api.alquran.cloud/v1/quran/en.asad';
  const response = await axios.get(apiUrl);

  if (response.data.status === 'OK' && response.data.data) {
    const ayahs = response.data.data.ayahs;
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    return randomAyah;
  } else {
    throw new Error('Unable to fetch Ayahs from the API.');
  }
}



async function updateReadme(ayah) {
  const readmePath = './README.md';
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const regex = /<!--START_SECTION:quran-->[\s\S]*<!--END_SECTION:quran-->/;

  let updatedAyah = `<!--START_SECTION:quran-->\n\n`;
  updatedAyah += `**Surah ${ayah.surah.number}: ${ayah.surah.name} (${ayah.surah.englishName})**\n\n`;
  updatedAyah += `${ayah.numberInSurah}. ${ayah.text} - ${ayah.translation.en}\n`;
  updatedAyah += `<!--END_SECTION:quran-->`;

  const updatedReadmeContent = readmeContent.replace(regex, updatedAyah);
  fs.writeFileSync(readmePath, updatedReadmeContent);
}

async function main() {
  const randomAyah = await getRandomAyah();
  await updateReadme(randomAyah);
}

main();
