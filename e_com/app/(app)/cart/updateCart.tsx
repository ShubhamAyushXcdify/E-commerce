"use client";
export const updateCart = async (id: number, cartData: any) => {
    if (!id) {
    console.error("Cart ID is required to update");
    return null;
  }

  const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });

  return res.json();
};


export default function UpdateCart() {

  const handleUpdate = async () => {

    const updatedCart = {
      userId: 1,
      products: [
        {
          id: 2,
          title: "Laptop",
          price: 800,
          description: "Updated product",
          category: "electronics",
          image: "http://example.com/laptop.jpg"
        }
      ]
    };

    const result = await updateCart(7, updatedCart);

    console.log(result);
  };

  return (
    <div>
      <button onClick={handleUpdate}>
        Update Cart
      </button>
    </div>
  );
}