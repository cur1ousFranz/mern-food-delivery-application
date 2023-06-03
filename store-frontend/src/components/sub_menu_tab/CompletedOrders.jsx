import OrderDetails from "./OrderDetails";

const CompletedOrders = ({ orders }) => {

    const completedOrders = orders.filter(order => order.status === 'Completed')

    return (
        <div>
            {completedOrders && completedOrders.map(order => (
                <OrderDetails key={order._id} order={order} />
            ))}
        </div>
    );
}

export default CompletedOrders;