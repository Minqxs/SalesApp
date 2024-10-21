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
    if (!response.ok) {
    const errorResponse = await response.text();
    console.error("Error response:", errorResponse);
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
}
    return await response.json();
};

const environment = new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
});

export default environment;
