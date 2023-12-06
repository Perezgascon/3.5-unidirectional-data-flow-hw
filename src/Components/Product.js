import { useState } from 'react'
import Card from './Card'
import ViewList from './ViewList'
import Savings from './Savings';
import { CardProvider } from "../Context/CardContext";
import { v4 as uuid } from 'uuid';



function Product() {
    const [count, setCount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [name, setName] = useState('Banana');
    const [price, setPrice] = useState(1.25);
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceNoDisc, setTotalPriceNoDisc] = useState(0);
    const [savings, setSavings] = useState(0);
    const [list, setList] = useState([]);

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
            let count = prevCount - 1;
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
            id: uuid(),
            name: name,
            price: price,
            quantity: count,
            discount: discount,
            total: (price * count) - discountedAmount,
            totalNoDiscount: price * count
        };
        const newList = [...items, newItem];
        setItems(newList);
        setName('');
        setPrice(0);
        console.log(newItem);

        setTotalPriceNoDisc(prevTotalPriceNoDisc => prevTotalPriceNoDisc + newItem.totalNoDiscount);
        setTotalPrice(prevTotalPrice => prevTotalPrice + newItem.total);
        const calculatedSavings = totalPriceNoDisc + newItem.totalNoDiscount - totalPrice - newItem.total;
        setSavings((calculatedSavings).toFixed(2));
    }

    const handlerDeleteProduct = (id) => {
        // create a new item list with everything except the item with matching ID
        const newList = list.filter(item => item.id!== id);
        setList(newList);
    
        // update new total
        // let newTotal = 0;
        // newList.forEach(item => {
        //   newTotal += item.quantity * item.price * (100 - item.discount) / 100;
        // });
        // setSumTotal(newTotal);
      }

    const ctx = {
        name,
        count,
        price,
        discount,
        handlerPlus,
        handlerMinus,
        handlerChangeName,
        handlerChangePrice,
        handlerAddProduct,
    };

    return (
        <>
            <CardProvider value={ctx}>
                <Card />
                <ViewList list={items} totalPrice={totalPrice} handlerDeleteProduct={handlerDeleteProduct}/>
                <Savings list={items} totalPriceNoDisc={totalPriceNoDisc} savings={savings} />
            </CardProvider >
        </>
    )
}

export default Product;
