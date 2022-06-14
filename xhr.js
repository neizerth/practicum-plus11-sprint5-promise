(async () => {

    const getRandomDog = () => new Promise((resolve, reject) => {
        // const url = 'https://dog.ceo/api/breeds/image/random';
        const url = 'https://dog2.ceo/api/breeds/image/random';
        const xhr = new XMLHttpRequest();
        
        xhr.responseType = 'json';
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', () => resolve(xhr.response));
        xhr.addEventListener('error', reject);
    });

    try {
        const data = await getRandomDog();
    }
    catch (e) {
        console.log(e);
    }
})();