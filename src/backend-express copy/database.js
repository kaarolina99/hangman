import mysql from "mysql2"; 
 
import dotenv from "dotenv"; 
dotenv.config() 
 
const pool = mysql.createPool({ 
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE 
}).promise() 



export async function getFlags(){
    const [rows] = await pool.query("SELECT * FROM ctfFlagg")
    return rows
}

export async function getFlag(id){
    const [rows] = await pool.query("SELECT * FROM ctfFlagg where id=?", [id])
    return rows[0]
}

export async function checkFlag(city, flag) {
    const [rows] = await pool.query(`SELECT * FROM ctfFlagg WHERE city = "${city}" AND flag = "${flag}"`);
    return rows.length > 0 ? rows[0] : null;
}

// export async function checkFlag(city, flag) {
//     const [rows] = await pool.query('SELECT * FROM notater WHERE city = ? AND contents = ?', [city, flag]);
//     return rows.length > 0 ? rows[0] : null;
// }

// SELECT * FROM ctfFlagg WHERE city = "" or ""="" AND flag = "" or ""=""