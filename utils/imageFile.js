import FS from 'fs'
import path from 'path'
import BadRequestError from '../errors/bad-request.js'
export const writeImageFile = async (data, categoryName) => {
    const matches = data.match(/^data:(.+);base64,(.*)$/);
    if (!matches) {
        throw new BadRequestError('Invalid base64-encoded image data')
    }
    const fileExtension = matches[1].split('/')[1];
    const imageFile = path.join('./client', 'public', 'assets', 'categories', `${categoryName}.${fileExtension}`)
    const promise = new Promise((resolve, reject) => {
        FS.writeFile(imageFile, matches[2], {
            encoding: 'base64'
        }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(imageFile)
            }
        });
    })
    try {
        const image = await promise
        return image.split('public')[1].replaceAll('\\', '/')
    } catch (error) {
        throw new Error('something went wrong ... please try again later')
    }
};


export const deleteImageFile = async (imagePath) => {
    const imageFile = path.join('./client', 'public', ...imagePath.split('/'))
    const promise = new Promise((resolve, reject) => {
        FS.unlink(imageFile, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(imageFile)
            }
        })
    })
    try {
        await promise
        return;
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        throw new Error('something went wrong ... please try again later')
    }

}