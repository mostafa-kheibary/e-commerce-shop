import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '../../components';
import { db } from '../../config/firebase.config';
import { useUserContext } from '../../context/User/UserContext';
import { IProducts } from '../../types/productsType';
import './ProfileOrder.css';

const ProfileOrder: React.FC = () => {
  const [orders, setOrders] = useState<[]>([]);
  const {
    state: { user },
  } = useUserContext();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, 'users', user.uid);
      const userData = await getDoc(docRef);
      setOrders(userData.data()!.purchuses);
    })();
  }, []);
  console.log(orders);
  return (
    <div className='order-page__orders'>
      {orders.map((order: any, i) => (
        <div key={i} className='order-page__orders__order'>
          <div className='order-page__orders__head'>
            <div>
              <h4 className='order-page__orders__order-id'>{order.orderId}</h4>
              <h4 className='order-page__orders__order-date'>{order.timeStamp.toDate().toDateString()}</h4>
            </div>
            <div>
              <h4 className='order-page__orders__order-price'>{order.totalPrice} $</h4>
            </div>
          </div>
          <div className='order-page__orders__order-products'>
            {order.products.length <= 4
              ? order.products.map((product: IProducts) => (
                  <img className='order-page__orders__order-img' src={product.imageUrls[0]} alt={product.name} />
                ))
              : order.products.splice(0, 4).map((product: IProducts) => (
                  <div>
                    <img className='order-page__orders__order-img' src={product.imageUrls[0]} alt={product.name} />+
                    {order.products.length - 4}
                  </div>
                ))}
          </div>
          <Button className='secoundry order-page__orders-button'>{'>'}</Button>
        </div>
      ))}
    </div>
  );
};

export default ProfileOrder;
