import fs from 'fs'

const deleteImage = async (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(`${filePath} was deleted`);
    })
}

export {
    deleteImage
}