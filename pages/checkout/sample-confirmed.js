
// REWRITE v2

import { usd } from '../../constants'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function SampleConfirmed() {
  const [show, setShow] = useState(true)

  const order = {
    vendor: 'sample env',
    amount: 'a million dollars',
    currency: 'USD',
    status: 'processing',
    shipping: {
      name: 'Bob Joe',
      address: {
        line1: '123 street',
        city: 'San Jose',
        country: 'US',
        line2: null,
        postal_code: '95131',
        state: 'CA'
      }
    },
  }

  useEffect(() => {
  }, [])

  if (!order) return <h1 className="my-5 display-4">Could Not Display Order</h1>
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>You pressed a button!</h4>
        </Modal.Body>
        <Modal.Footer>
          <p className="text-muted mx-auto">I made a pencil with two erasers. It was pointless</p>
        </Modal.Footer>
      </Modal>
      <h1 className="display-3 my-4">
        Order Recieved
      </h1>
      <p>Payment Vendor: {order.vendor}</p>
      <p>Amount: {usd(order.amount)}</p>
      <p>Currency: {order.currency}</p>
      <p>Status: {order.status}</p>
      <p>Name: {order.shipping?.name}</p>
      <div>Address: {Object.keys(order.shipping?.address || {}).map((el, index) => {
          return (
            <div key={index} className="ml-4" style={{lineHeight: '.7'}}>
              <br/>
              {`${el}: ${order.shipping.address[el]}`}
            </div>
          )
        })}
      </div>
    </>
  )
}