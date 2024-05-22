import React from 'react';

interface Item {
  name: string;
  price: number;
  qty: number;
  color?: string;
  total: number;
  productId: string;
}

const items: Item[] = [
  { name: 'Retro Nike Sweatshirt', price: 7000, qty: 1, color: 'Blue', total: 7500, productId: "#21155347890" },
  { name: 'Nike Sport Sweat-pant', price: 8500, qty: 2, color: 'Black, White', total: 17000, productId: "#21155347890" },
  { name: 'High Nike Sneaker', price: 17500, qty: 1, color: 'Orange', total: 17500, productId: "#21155347890" },
  { name: 'Retro Nike Sweatshirt', price: 5500, qty: 2, color: 'Blue', total: 11000, productId: "#21155347890" },
];

const ShoppingCart = () => {
  const subtotal = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img src="/images/logo1.png" alt="Uniclique" className="h-8 mr-2" />
            <h1 className="text-2xl font-bold text-white">Uniclique</h1>
          </div>
          <button className="bg-red-900 hover:bg-red-600 text-white rounded shopping-btn">
            &larr; Continue Shopping
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center font-poppins">My Cart</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white-200 border-b border-red-800 py-2 px-4">
              <th className="px-4 py-6 text-left">PRODUCT</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">QTY</th>
              <th className="px-4 py-2 text-left">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-red-800">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src={`/images/${item.name.replace(/\s/g, '')}.png`}
                    alt={item.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <p className="font-semibold productName">{item.name}</p>
                    {item.productId && (
                      <p className="text-gray-500 font-100 productId">#{item.productId}</p>
                    )}
                    {item.color && (
                      <p className="text-gray-500 productColor">Color: {item.color}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 align-top productPrice">₦{item.price.toLocaleString()}</td>
                <td className="px-4 py-2 align-top quantitydiv">
                  <button className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-l">
                    -
                  </button>
                  <span className="mx-1">{item.qty}</span>
                  <button className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-r">
                    +
                  </button>
                </td>

                <td className="px-4 py-2 align-top relative">
                  <div className="mobilediv">
                  ₦{item.total.toLocaleString()}
                  <div className="px-4 py-2 align-top quantitybtn">
                      <button className=" py-1 px-2 rounded-l qtybtn">
                        -
                      </button>
                      <span className="mx-1">{item.qty}</span>
                      <button className=" py-1 px-2 rounded-r qtybtn">
                        +
                      </button>
                    </div>
                  <button className="absolute top-0 right-0 text-red-800 hover:text-red-600 xmark">
                    &times;
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <div className="mt-4 bg-pink-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">Choose Delivery Method:</p>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="delivery" defaultChecked className="form-radio" />
              <span className="ml-2">Store Pickup (In 30 min) • FREE</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="delivery" className="form-radio" />
              <span className="ml-2">Delivery at home (Under 2 - 4 days) • ₦2,000</span>
            </label>
          </div>
          <div className="mt-4 text-right">
            <p className="text-sm">SUB TOTAL: ₦{subtotal.toLocaleString()}</p>
            <p className="text-sm">SHIPPING: Free</p>
            <p className="text-lg font-semibold mt-2">TOTAL: ₦{subtotal.toLocaleString()}</p>
            <button className="bg-red-900 hover:bg-red-600 text-white py-2 px-4 rounded mt-4 checkout-btn">
              CHECKOUT ₦{subtotal.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;