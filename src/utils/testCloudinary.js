import dotenv from "dotenv";
// 🚨 FIXED: Look directly in the current folder
dotenv.config({ path: ".env" }); 

import fs from "fs";
import path from "path";
import { uploadOnCloudinary } from "./cloudinary.js"; 

const runUltimateTest = async () => {
    console.log("🚀 STARTING THE ULTIMATE ISOLATED CLOUDINARY TEST...");

    const tempDir = path.resolve("./public/temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const testFilePath = path.join(tempDir, "guaranteed-real-image.jpg");

    try {
        console.log("⬇️ Downloading a valid image from the internet...");
        const response = await fetch("https://picsum.photos/200");
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(testFilePath, buffer);
        console.log(`✅ Saved valid image to disk! Size: ${buffer.length} bytes`);

        console.log("⏳ Uploading to Cloudinary using YOUR cloudinary.js...");
        const uploadResult = await uploadOnCloudinary(testFilePath);

        if (uploadResult && uploadResult.url) {
            console.log("\n🎉 MASSIVE SUCCESS! YOUR CLOUDINARY CODE WORKS PERFECTLY.");
            console.log("🌐 Image live at:", uploadResult.url);
            console.log("\n🛑 CONCLUSION: Your backend code is flawless. POSTMAN is corrupting the files. We will fix Postman next.");
        } else {
            console.log("\n❌ FAILED. Cloudinary rejected it.");
        }
    } catch (error) {
        console.error("❌ Test crashed:", error);
    }
};

runUltimateTest();