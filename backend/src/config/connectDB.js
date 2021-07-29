const mongoose = require("mongoose");

module.exports = {
  connectDB: () => {
    mongoose.connect(
      process.env.MONGODB_CONNECTION_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit();
        }
        console.log("MONGODB connected successfully");
      }
    );
  },
};
