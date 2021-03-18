import app from "./index";
import Config from "./config";

app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
})