import { useState } from 'react'
import Card from './Card'
import ViewList from './ViewList'
import Savings from './Savings';

function Product () {
    const [count, setCount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [name, setName] = useState('Banana');
    const [price, setPrice] = useState(1.25);
    const [items, setItems] = useState([]);

    const handlerPlus = () => {
        setCount((prevCount) => {
            let count = prevCount + 1;
            if (count >= 5) {
                setDiscount(20);
            }
            return count;
        });
    };

    const handlerMinus = () => {
        setCount((prevCount) => {
            let count = prevCount -1;
            if (count < 5) {
                setDiscount(0);
            }
            if (count < 0) return 0;

            return count;
        });
    };

    const handlerChangeName = (value) => {
        setName(value);
    };

    const handlerChangePrice = (value) => {
        setPrice(value);
    };

    const handlerAddProduct = () => {

        const discountedAmount = (price * count) * (discount / 100)

        const newItem = {
            name: name,
            price: price,
            quantity: count,
            discount: discount,
            total: (price * count) - discountedAmount,
        };
        const newList = [...items, newItem];
        setItems(newList);
        setName('');
        setPrice(0);
    }

    return (
        <>
            <Card 
            name={name}
            count={count}
            price={price}
            discount={discount}

            handlerPlus={handlerPlus}
            handlerMinus={handlerMinus}
            handlerChangeName={handlerChangeName}
            handlerChangePrice={handlerChangePrice}
            handlerAddProduct={handlerAddProduct}
            />

            <ViewList list={items}/>
            <Savings />
        </>
    )
}

export default Product;