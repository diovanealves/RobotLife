import * as SQlite from "expo-sqlite";
const db = SQlite.openDatabase("db.db");

export default db;
