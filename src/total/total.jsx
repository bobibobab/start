import React from 'react';

export function Total() {
    const [totals, setTotals] = React.useState([]);
    
    const fetchData = async () => {
        try {
            const response = await fetch('/api/totals');
            if (response.status === 200) {
                const data = await response.json(); // Parse JSON data
                setTotals(data); // Update state with parsed data

                localStorage.setItem('totals', JSON.stringify(data)); // Save data to localStorage
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, []);
    
        
            
    

    return (
        <main className='container-Total'>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {totals.map((total, index) => (
                        <tr key={index}>
                            <td>{index}</td>12
                            <td>{total.username}</td>
                            <td>{total.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}