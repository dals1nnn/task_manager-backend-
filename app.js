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





///MAIN
const method = process.argv[2]
const second = process.argv[3]
const third = process.argv[4]



///post put delete get
if (method !== "post" && method !== "delete" && method !== "get" && method !== "patch"){
    console.log(`Error, command ${method} is not valid. try: post, delete, get, patch`)
    process.exit(0)
}

///post method
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






///add update and get
if (method == "get"){
    if (second === undefined){
        const rawData = await readFile(".\\tasks.json", "utf8")
        const jsonData = JSON.parse(rawData)
        console.log(jsonData)
    }else{
         //add search by id
        const rawData = await readFile(".\\tasks.json", "utf8")
        const jsonData = JSON.parse(rawData)
        console.log(jsonData[(parseInt(second) - 1)])
    }

}







if (method == "delete"){
    if (second == undefined){
        console.log("After the delete, please inform the ID of the task that you want to exclude")
        process.exit(0)
    }else{
        const rawData = await readFile(".\\tasks.json", "utf-8")
        const jsonData = JSON.parse(rawData)
        jsonData.splice((parseInt(second) - 1), 1)
        await writeFile(".\\tasks.json", JSON.stringify(jsonData, null, 2), "utf-8")
        console.log(jsonData)
    }
}


if (method === "patch"){
    if (second === undefined || typeof parseInt(second) !== 'number'){
        console.log("Please enter the ID of the task that you want to update and what is the status")
        console.log("Example: node app.js patch 1 ´in progress´")
        process.exit(0)
    }
    let id = (parseInt(second) - 1)

    const rawData = await readFile(".\\tasks.json", "utf-8")
    const jsonData = JSON.parse(rawData)
    jsonData[id]["status"] = third
    jsonData[id]["updatedAt"] = getCurrentTime()
    await writeFile(".\\tasks.json", JSON.stringify(jsonData, null, 2), "utf-8")
    console.log(jsonData)
}
