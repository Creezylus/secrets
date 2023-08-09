function HTTPResModel(responseCode, error) {
    
    if(typeof responseCode !== 'number')
    {
        throw new Error ('Response Code must be a number');
    }

    this.responseCode = responseCode;
    this.error = error;
}

export default HTTPResModel;