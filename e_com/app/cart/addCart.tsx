"use client";

const createCart = async (cartData: any) => {
  const res = await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });

  return res.json();
};

export default function AddCart() {
  const handleCreate = async () => {
    const newCart = {
      userId: 2,
      products: [
        {
          id: 1,
          title: "Phone",
          price: 500,
          description: "Smart phone",
          category: "electronics",
          image: "http://example.com/image.jpg",
        },
      ],
    };

    const result = await createCart(newCart);

    console.log(result);
  };

  return (
    <div>
      <button onClick={handleCreate}>Add Cart</button>
    </div>
  );
}