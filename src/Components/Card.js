import React from 'react'
import Button from './Button'
import Input from './Input'
import styles from './Card.module.css'

export default function Card(
  { name, count, price, discount, handlerPlus,
    handlerMinus, handlerChangeName, handlerChangePrice, handlerAddProduct
  }
) {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{name}</div>
        <div className={styles.counter}>
          <Button label="+" onClick={handlerPlus} />
          <span>{count}</span>
          <Button label="-" onClick={handlerMinus} />
        </div>
        <div className={styles.price}><p>${price} each</p></div>
        <div className={styles.discount}>{`Discount: ${discount}%`}</div>
        <div className={styles.form}>
          <Input value={name} label='Product Name' onChange={handlerChangeName} />
          <Input value={price} label='Price' onChange={handlerChangePrice} />
        </div>
        <div>
          <Button label="Add Product" onClick={handlerAddProduct} />
        </div>
      </div>
    </>
  )
}
