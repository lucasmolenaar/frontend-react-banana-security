function checkTokenExpiration(tokenExp) {
    const currentTs = Math.round((new Date()).getTime() / 1000);
    console.log(currentTs);
    return (tokenExp > currentTs);
}

export default checkTokenExpiration;