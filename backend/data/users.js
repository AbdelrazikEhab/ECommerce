import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Abdelrazik Ehab",
    email: "abdo@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Moaz Ehab",
    email: "moaz@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Rokia Ehab",
    email: "rokia@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
];

export default users;
