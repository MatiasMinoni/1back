
const { writeFile } = require('fs/promises');
const { appendFile} = require('fs/promises');
const { readFile } = require('fs/promises');
const { unlink } = require('fs/promises');




async function writeToFile(fileName, data) {
    try {
      await writeFile(fileName, JSON.stringify(data));
      console.log(`Wrote data to ${fileName}`);
    } catch (error) {
      console.error(`Got an error trying to write the file: ${error.message}`);
    }
  }async function appendToFile(fileName, data) {
      try {
        await appendFile(fileName,JSON.stringify(data),{ flag: 'w' });
        console.log(`Appended data to ${fileName}`);
      } catch (error) {
        console.error(`Got an error trying to append the file: ${error.message}`);
      }
    }
    async function readThisFile(filePath) {
      try {
        const data = await readFile(filePath);
        console.log(data.toString());
      } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
     }
    }
    async function deleteFile(filePath) {
      try {
        await unlink(filePath);
        console.log(`Deleted ${filePath}`);
      } catch (error) {
        console.error(`Got an error trying to delete the file: ${error.message}`);
      }
    }
  
    module.exports={writeToFile, appendToFile, deleteFile, readThisFile}
    