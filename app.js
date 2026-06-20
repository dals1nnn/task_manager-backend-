import { readFile, writeFile } from 'fs/promises';

async function readJsonFile(filePath){
    try{
        const rawData = await readFile(filePath, 'utf8')
        const jsonData = JSON.parse(rawData)
        return jsonData
    }catch(error){
        console.log("Error, reading or parsing file: ", error);
    }
}

function getCurrentTime(){
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    return currentTime
}

const method = process.argv[2]
const second = process.argv[3]
///post put delete get
if (method !== "post" && method !== "delete" && method !== "get"){
    console.log(`Error, command ${method} is not valid. try: post, delete, get`)
    process.exit(0)
}

if (method === "post"){
    if (second === undefined){
        console.log("Type the task that you want to add after the POST")
        process.exit(0)
    }
    
    let currentTime = getCurrentTime()
    
    try{
        const rawData = await readFile(".\\tasks.json", 'utf8')
        const jsonData = JSON.parse(rawData)

        const newid = (jsonData.length + 1)
        let newItem = {"id": newid, 
            "description": second, 
            "status": "todo", 
            "createdAt": currentTime,
            "updatedAt": currentTime
        }

        jsonData.push(newItem)
        await writeFile(".\\tasks.json", JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log(jsonData)
    }catch(error){
        console.log("Error, reading or parsing file: ", error);
    }
}

