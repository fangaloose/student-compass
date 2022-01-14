async function handleErrors(response:any) {
    if (!response.ok) {
        const errMsg=await response.text();
        throw Error(errMsg || response.statusText);
    }
    return response;
}

export default handleErrors