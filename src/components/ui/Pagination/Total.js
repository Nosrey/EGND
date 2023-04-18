import React from 'react'

function Total(props) {
  const { total } = props
  return (
    <div className="pagination-total">
      Total <span>{total}</span> Items
    </div>
  )
}

export default Total
