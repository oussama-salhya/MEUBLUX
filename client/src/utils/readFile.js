const readFile = async (file) => {
    const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })

    const result = await promise
    return result
}


export default readFile