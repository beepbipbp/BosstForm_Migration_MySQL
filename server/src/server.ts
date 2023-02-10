import app from "./app";
import myDataSource from "./Loader/MySQL.Loader";

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.listen(process.env.PORT);
