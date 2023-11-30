import React from 'react'
import styles from './Savings.module.css'

export default function Savings({ totalPriceNoDisc, savings }) {
  return (
    <>
      <div  className={styles.savings}>
        <div>Without discount, your total would be: <strong>${totalPriceNoDisc}</strong></div>
        <div>You are saving: <strong>${savings}</strong></div>
      </div>
    </>
  )
}
