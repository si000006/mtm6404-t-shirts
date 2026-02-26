const tshirts = [
  { title: "Blue T-Shirt", image: "images/blue-t-shirt.jpg", price: 7.99, stock: 4, quantity: 1 },
  { title: "Bright Purple T-Shirt", image: "images/bright-purple-t-shirt.jpg", price: 5.99, stock: 1, quantity: 1 },
  { title: "Cobalt Blue T-Shirt", image: "images/cobalt-blue-t-shirt.jpg", price: 9.99, stock: 5, quantity: 1 },
  { title: "Green T-Shirt", image: "images/green-t-shirt.jpg", price: 6.99, stock: 0, quantity: 1 },
  { title: "Grey T-Shirt", image: "images/grey-t-shirt.jpg", price: 4.99, stock: 2, quantity: 1 },
  { title: "Light Green T-Shirt", image: "images/light-green-t-shirt.jpg", price: 7.99, stock: 4, quantity: 1 },
  { title: "Purple T-Shirt", image: "images/purple-t-shirt.jpg", price: 7.99, stock: 0, quantity: 1 },
  { title: "Red T-Shirt", image: "images/red-t-shirt.jpg", price: 6.99, stock: 3, quantity: 1 },
  { title: "Teal T-Shirt", image: "images/teal-t-shirt.jpg", price: 7.99, stock: 2, quantity: 1 }
];

const App = () => {
  const { useState } = React;

  const [items, setItems] = useState(() => {
    return tshirts.map((t) => ({ ...t, quantity: 1 }));
  });

  const setQty = (index, qty) => {
    setItems((prev) => {
      return prev.map((t, i) => {
        if (i !== index) return t;

        let safeQty = qty;
        if (safeQty < 1) safeQty = 1;
        if (safeQty > t.stock) safeQty = t.stock;

        return { ...t, quantity: safeQty };
      });
    });
  };

  const buy = (index) => {
    setItems((prev) => {
      return prev.map((t, i) => {
        if (i !== index) return t;
        if (t.stock <= 0) return t;

        let qty = parseInt(t.quantity);
        if (!qty || qty < 1) qty = 1;
        if (qty > t.stock) qty = t.stock;

        const newStock = t.stock - qty;

        return { ...t, stock: newStock, quantity: 1 };
      });
    });
  };

  const h = React.createElement;

  return h(
    "div",
    { className: "app" },
    h("h1", null, "T-Shirts Storefront"),
    h(
      "div",
      { className: "grid" },
      items.map((t, index) => {
        const inStock = t.stock > 0;

        let options = [];
        if (inStock) {
          for (let n = 1; n <= t.stock; n++) {
            options.push(h("option", { key: n, value: n }, n));
          }
        }

        return h(
          "div",
          { className: "card", key: t.title + "-" + index },
          h("div", { className: "title" }, t.title),
          h("img", { className: "img", src: t.image, alt: t.title }),
          h(
            "div",
            { className: "meta" },
            h("strong", null, "$" + t.price),
            " · ",
            inStock ? "Stock: " + t.stock : h("span", { className: "oos" }, "Out of Stock")
          ),
          inStock
            ? h(
                "div",
                { className: "row" },
                h(
                  "select",
                  {
                    value: t.quantity,
                    onChange: (e) => setQty(index, parseInt(e.target.value))
                  },
                  options
                ),
                h("button", { onClick: () => buy(index) }, "Buy")
              )
            : null
        );
      })
    )
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(React.createElement(App));