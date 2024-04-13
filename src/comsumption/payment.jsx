import React from 'react';
import './payment.css';
import { Paied, GameNotifier } from './notifier';

export function Payment(props) {
    const [item, setItem] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [items, setItems] = React.useState([
        { }
    ]);


    async function addTable(){
        const data = {
            "item": item,
            "month": props.month,
            "price": Number(price),
        }
        const comsumption_res = await fetch('/api/comsumption', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (comsumption_res?.status === 200){
            
            localStorage.setItem("comsumption", JSON.stringify(data));
            setItems([...items, data]);
            setItem("");
            setPrice("");
            var total = 0;
            total += data.price;
            const totalData = {
                "rank": 0,
                "username": props.userName,
                "total": total
            }

            const response = await fetch(`/api/total/${totalData.username}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(totalData),
            });
        }else{
            alert("Please enter item and price.")
        }

        GameNotifier.broadcastEvent(props.userName, data.price);

    }

    return (
        <div className='contentTable'>
            <div className='paymentTable'>
                <h3>Payment</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((data, index) => (
                            <tr key={index}>
                                <td>{data.item}</td>
                                <td>{data.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Input fields and button for adding new items */}
            <div className='input'>
                <div className='payment_item'>
                    <span className='input-group-text'>Item</span>
                    <input
                        className='payment_item'
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        type='text'
                        placeholder='Put the item'
                    />
                </div>
                <div className='payment_price'>
                    <span className='input-group-text'>Price</span>
                    <input
                        className='payment_item'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type='number'
                        placeholder='Put the price'
                    />
                </div>
            </div>
            {/* Button to trigger adding item to the table */}
            <button
                type="button"
                className="btn btn-success"
                onClick={() => addTable()}
            >
                Enter
            </button>
        </div>
    );
}