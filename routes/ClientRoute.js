import { Router } from "express";
import path from 'path'
import { fileURLToPath } from "url";
const router = Router();

router.route("/*").get(function (req, res) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    // Send the index.html file
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
})

export default router