import React from 'react'
import styles from './ViewList.module.css'

export default function ViewList({ list }) {
    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.discount}%</td>
                                <td>{item.total}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan="4">Total:</td>
                        <td>{list.reduce((sum, item) => sum + item.total, 0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


