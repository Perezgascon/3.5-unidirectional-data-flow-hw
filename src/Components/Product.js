import { useState } from 'react'
import Card from './Card'
import ViewList from './ViewList'
import Savings from './Savings';
import { CardProvider } from "../Context/CardContext";
import { v4 as uuid } from 'uuid';
import styles from './Product.module.css'
import Button from './Button';



function Product() {
    const [count, setCount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [name, setName] = useState('Banana');
    const [price, setPrice] = useState(1.25);
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceNoDisc, setTotalPriceNoDisc] = useState(0);
    const [savings, setSavings] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const blankForm = {
        index: 0,
        name: '',
        quantity: 0,
        price: 0,
        discount: 0
    }

    const [form, setForm] = useState(blankForm);

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

        const newItem = {
            id: uuid(),
            name: name,
            price: price,
            quantity: count,
            discount: discount,
            total: price * count * (100 - discount) / 100,
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
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);

        let newTotal = 0;
        newItems.forEach(item => {
            newTotal += item.quantity * item.price * (100 - item.discount) / 100;
        });
        setTotalPrice(newTotal);

        let newTotalPriceNoDisc = 0;
        newItems.forEach(item => {
            newTotalPriceNoDisc += item.quantity * item.price;
        });
        setTotalPriceNoDisc(newTotalPriceNoDisc);

    }

    const handlerSubmitForm = (event) => {
        event.preventDefault();

        const newItem = { ...items[form.index] };
        newItem.name = form.name;
        newItem.quantity = form.quantity;
        newItem.price = form.price;
        newItem.discount = form.discount;
        newItem.total = form.quantity * form.price * (100 - form.discount) / 100

        const newList = [...items];
        newList[form.index] = newItem;
        setItems(newList);

        const newTotalPrice = totalPrice - items[form.index].total + newItem.total;
        setTotalPrice(newTotalPrice);

        setIsEditing(false);
    }

    const handlerEditForm = (id) => {
        const i = items.findIndex((item) => item.id === id)
        const editValues = {
            index: i,
            name: items[i].name,
            quantity: items[i].quantity,
            price: items[i].price,
            discount: items[i].discount,
        }


        setForm(editValues);
        setIsEditing(true);
    }

    const handlerUpdateForm = (event, key) => {
        const value = event.target.value;
        const updatedForm = { ...form, [key]: value };
        setForm(updatedForm);
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
            </CardProvider >
            <ViewList
                list={items}
                totalPrice={totalPrice}
                handlerDeleteItem={handlerDeleteProduct}
                handlerEditItem={handlerEditForm} />
            <Savings
                list={items}
                totalPriceNoDisc={totalPriceNoDisc}
                savings={savings} />
            {isEditing &&
                <form className={styles.form} onSubmit={handlerSubmitForm}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Disc %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input value={form.name} type='text'
                                        onChange={(e) => handlerUpdateForm(e, 'name')} />
                                </td>
                                <td>
                                    <input value={form.quantity} type='number' min={1}
                                        onChange={(e) => handlerUpdateForm(e, 'quantity')} />
                                </td>
                                <td>
                                    <input value={form.price} type='number' min={0} step={0.01}
                                        onChange={(e) => handlerUpdateForm(e, 'price')} />
                                </td>
                                <td>
                                    <input value={form.discount} type='number' min={0}
                                        onChange={(e) => handlerUpdateForm(e, 'discount')} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' />
                    <Button label='Cancel' onClick={() => setIsEditing(false)} />
                </form>
            }

        </>
    )
}

export default Product;
