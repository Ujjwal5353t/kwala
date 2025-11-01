import './suppress-warning.js';
import path from 'path';
import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
});