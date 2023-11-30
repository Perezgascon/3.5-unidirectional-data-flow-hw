import React from 'react'
import styles from './Savings.module.css'

export default function Savings({ list }) {
  return (
    <>
      <div  className={styles.savings}>
        <div>Without discount, your total would be: <strong>${list.reduce((sum, item) => sum + item.totalNoDiscount, 0)}</strong></div>
        <div>You are saving: <strong>${(list.reduce((sum, item) => sum + item.totalNoDiscount, 0)) - (list.reduce((sum, item) => sum + item.total, 0))}</strong></div>
      </div>
    </>
  )
}
