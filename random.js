const fs = require('fs');
const axios = require('axios');

async function getRandomAyah() {
  const apiUrl = 'https://api.alquran.cloud/v1/quran/en.asad';
  const response = await axios.get(apiUrl);
// console.log(response.data.data);
  if (response.data.status === 'OK' && response.data.data) {
    const surahlength = response.data.data.surahs;
    const randomsurah = response.data.data.surahs[Math.floor(Math.random() * surahlength.length)];
    const ayahlength = randomsurah.ayahs;
 
    const randomAyah = ayahlength[Math.floor(Math.random() * ayahlength.length)];
    console.log(randomAyah);
    return {
        surah : randomsurah.name,
        englishName : randomsurah.englishName,
        surahnumber : randomsurah.number,
        ayah : randomAyah.text,
        number : randomAyah.numberInSurah,
    };
  } else {
    throw new Error('Unable to fetch Ayahs from the API.');
  }
}



async function updateReadme(ayah) {
  const readmePath = './README.md';
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const regex = /<!--START_SECTION:quran-->[\s\S]*<!--END_SECTION:quran-->/;

  let updatedAyah = `<!--START_SECTION:quran-->\n\n`;
  updatedAyah += `**Surah ${ayah.surahnumber}: ${ayah.surah} (${ayah.englishName}) - ${ayah.number)**\n\n`;
  updatedAyah += `${ayah.ayah}\n `;
  updatedAyah += `<!--END_SECTION:quran-->`;

  const updatedReadmeContent = readmeContent.replace(regex, updatedAyah);
  fs.writeFileSync(readmePath, updatedReadmeContent);
}

async function main() {
  const randomAyah = await getRandomAyah();
  await updateReadme(randomAyah);
}

main();
