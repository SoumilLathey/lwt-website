
import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

const migrate = () => {
    console.log('Checking for missing columns...');

    // Check complaint_images for description
    db.all("PRAGMA table_info(complaint_images)", (err, rows) => {
        if (err) {
            console.error("Error checking complaint_images info:", err);
            return;
        }
        const hasDescription = rows.some(row => row.name === 'description');
        if (!hasDescription) {
            console.log("Adding description column to complaint_images table...");
            db.run("ALTER TABLE complaint_images ADD COLUMN description TEXT", (err) => {
                if (err) console.error("Error adding description to complaint_images:", err);
                else console.log("Successfully added description to complaint_images.");
            });
        } else {
            console.log("complaint_images already has description column.");
        }
    });

    // Check enquiry_images for description (it was missing there too, though the code used description as imageType, but maybe we want a real description?)
    // The code logic for enquiry is: INSERT INTO enquiry_images (enquiryId, imageType, imagePath, uploadedBy) VALUES (?, description || 'Photo...', ...)
    // So it treats description as imageType. That might be intended or a hack.
    // However, for complaint_images, the code EXPLICITLY tries to insert into a 'description' column.
};

migrate();
