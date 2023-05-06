import Order from "./Order";

const OrderList = ({ orders }) => {

    return (
        <div className="space-y-6">
            {orders && orders.map(order => (
                <Order order={order} key={order._id}/>
            ))}

            {orders.length === 0 && (
                <div className="text-center py-12">
                    <p className="font-semibold text-2xl text-gray-600">No orders yet.</p>
                </div>
            )}
        </div>
    );
}

export default OrderList;