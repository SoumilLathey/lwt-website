
import db from './database.js';

const addColumns = () => {
    db.serialize(() => {
        db.run("ALTER TABLE complaints ADD COLUMN closureOtp TEXT", (err) => {
            if (err) {
                if (err.message.includes("duplicate column")) {
                    console.log("Column closureOtp already exists");
                } else {
                    console.error("Error adding closureOtp column:", err);
                }
            } else {
                console.log("Added closureOtp column");
            }
        });

        db.run("ALTER TABLE complaints ADD COLUMN closureOtpExpiresAt DATETIME", (err) => {
            if (err) {
                if (err.message.includes("duplicate column")) {
                    console.log("Column closureOtpExpiresAt already exists");
                } else {
                    console.error("Error adding closureOtpExpiresAt column:", err);
                }
            } else {
                console.log("Added closureOtpExpiresAt column");
            }
        });
    });
};

addColumns();
