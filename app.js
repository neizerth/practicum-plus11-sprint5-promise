(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve,ms));

    const loadJokes = async criteria => {
        const { category, amount = 1 } = criteria;
        const baseUrl = 'https://v2.jokeapi.dev/joke';
        const url = `${baseUrl}/${category}?amount=${amount}`;

        const response = await fetch(url);
        if (!response.ok) {
            return {};
        }
        return await response.json();
    }

    const createWidget = async options => {
        const { criteria, container, title } = options;
        const { jokes = [] } = await loadJokes(criteria);

        const widgetTemplate = document.getElementById('jokes-widget');
        const jokeTemplate = document.getElementById('joke');

        const containerNode = widgetTemplate.content.cloneNode(true);
        const widgetTitle = containerNode.querySelector('.jokes-widget__title'); 
        const jokesContainer = containerNode.querySelector('.jokes-widget__jokes');
        widgetTitle.textContent = title;
        
        jokes.forEach(data => {
            const jokeNode = jokeTemplate.content.cloneNode(true);
            const jokeBlock = jokeNode.querySelector('.joke');
            if (data.type === 'single') {
                jokeBlock.textContent = data.joke;
            }
            if (data.type === 'twopart') {
                jokeBlock.textContent = `${data.setup} - ${data.delivery}`;
            }
            jokesContainer.append(jokeNode);
        });

        container.append(containerNode);
    }

    const options = [
        {
            criteria: {
                category: 'Programming',
                amount: 100
            },
            container: document.getElementById('programming'),
            title: 'Программирование'
        },
        {
            criteria: { 
                category: 'Dark',
                amount: 200
            },
            container: document.getElementById('dark'),
            title: 'Черный юмор'
        },
        {
            criteria: { 
                category: 'Christmas',
                amount: 50
            },
            container: document.getElementById('christmas'),
            title: 'Новый год'
        }
    ];

    const promise = options.reduce((promise, config) => {
        return promise
            .then(() => delay(2000))
            .then(() => createWidget(config))
    }, Promise.resolve());

    for (const widgetConfig of options) {
        await delay(2000)
        await createWidget(widgetConfig);
    }
    
})();