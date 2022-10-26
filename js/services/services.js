async function getResource(url){
    const res = await fetch(url);
    if(!res.ok)
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    return await res.json();
}

const postData = async(url, data)=>{
    const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            } 
    });
    return await res.json();
}

export {getResource}
export {postData}