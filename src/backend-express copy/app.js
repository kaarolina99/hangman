import express from "express"; 
import cors from "cors"; 
import path from "path";
import { getFlag, getFlags, checkFlag } from "./database.js"; 

const app = express(); 
app.use(cors()); 
app.use(express.json())

const port = 3000; 

app.get("/flags", async (req, res) => {
    const flags = await getFlags()
    res.send(flags)
})

app.get("/flags/:Id", async (req, res) => {
    const Id = req.params.Id
    const flag = await getFlag(Id)
    res.send(flag)
})
 

app.post('/checkFlag', async (req, res) => {
    const { city, flag } = req.body;
    try {
        const result = await checkFlag(city, flag);
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


 
 
app.use((err, req, res, next) => { 
    console.error(err.stack) 
    res.status(500).send('Something broke!') 
}) 
 
app.listen(port, () => { 
    console.log(`Server på http://localhost:${port}`) 
}) 
 