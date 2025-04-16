function TagNormalize(text) {
    if(typeof text === 'string') {
        return text
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    return text
}


export default TagNormalize;