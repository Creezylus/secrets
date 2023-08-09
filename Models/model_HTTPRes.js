function HTTPResModel(responseCode, responseMessage) {

    if(typeof responseCode !== 'number')
    {
        throw new Error ('Response Code must be a number');
    }

    this.responseCode = responseCode;
    this.message = responseMessage;
}

export default HTTPResModel;