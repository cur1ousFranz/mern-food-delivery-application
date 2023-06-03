import OrderDetails from "./OrderDetails";

const PendingOrders = ({ orders }) => {

    const pendingOrders  = orders.filter(order => order.status === 'Pending')

    return (
        <div>
            {pendingOrders && pendingOrders.map(order => (
                <OrderDetails key={order._id} order={order} />
            ))}
        </div>
    );
}

export default PendingOrders;