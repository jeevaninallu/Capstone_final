const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

async function seedUsers() {
  try {
    const users = [
      {
        name: "Jeevani",
        email: "jeevani.nallu23@st.niituniversity.in",
        password: "jeevani123"
      },
      {
        name: "Akshaya",
        email: "gunda.akshaya23@st.niituniversity.in",
        password: "akshaya123"
      },
      {
        name: "Navaneeth",
        email: "eswaranavaneeth.chaluvadi23@st.niituniversity.in",
        password: "navaneeth123"
      },
      {
        name: "Nikita",
        email: "nikita.pulapally23@st.niituniversity.in",
        password: "nikita123"
      }
    ];

    for (let user of users) {
      const exists =
        await User.findOne({
          email: user.email
        });

      if (!exists) {
        const hashed =
          await bcrypt.hash(
            user.password,
            10
          );

        await User.create({
          name: user.name,
          email: user.email,
          password: hashed
        });

        console.log(
          `${user.email} added`
        );
      } else {
        console.log(
          `${user.email} already exists`
        );
      }
    }

    console.log("All Users Ready");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit();
  }
}

seedUsers();