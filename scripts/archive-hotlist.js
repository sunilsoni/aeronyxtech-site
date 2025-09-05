const fs = require("fs");
const path = require("path");

// Paths
const hotlistFile = path.resolve("src/data/hotlist.json");
const archiveFile = path.resolve("src/data/hotlist-archive.json");

// Load data
const hotlist = fs.existsSync(hotlistFile)
    ? JSON.parse(fs.readFileSync(hotlistFile, "utf8"))
    : [];
const archive = fs.existsSync(archiveFile)
    ? JSON.parse(fs.readFileSync(archiveFile, "utf8"))
    : [];

// Threshold (30 days ago)
const now = new Date();
const threshold = new Date();
threshold.setDate(now.getDate() - 30);

const stillActive = [];
const toArchive = [];

// Split jobs
hotlist.forEach((job) => {
    const postedAt = new Date(job.postedAt);
    if (postedAt < threshold) {
        toArchive.push(job);
    } else {
        stillActive.push(job);
    }
});

// Merge into archive
const updatedArchive = [...archive, ...toArchive];

// Save updated files
fs.writeFileSync(hotlistFile, JSON.stringify(stillActive, null, 2));
fs.writeFileSync(archiveFile, JSON.stringify(updatedArchive, null, 2));

console.log(`✅ Archived ${toArchive.length} job(s).`);
console.log(`📂 Active jobs: ${stillActive.length}`);
console.log(`📂 Archived jobs: ${updatedArchive.length}`);