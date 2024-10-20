import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchGraphQL = async (operation, variables) => {
    const response = await fetch('http://localhost:5095/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',  // Allows credentials (if needed)
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    });
    return await response.json();
};

const environment = new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
});

export default environment;
