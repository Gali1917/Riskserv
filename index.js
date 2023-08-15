import { connectDB } from "./src/db.js";
import { PORT } from "./src/config/config.js";
import app from "./src/config/app.js";

connectDB();

app.listen(PORT);
console.log("Servidor corriendo por puerto ", PORT);
