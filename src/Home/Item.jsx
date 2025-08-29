import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./home.css";
import { useTranslation } from "react-i18next";

export default function Item() {
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://fakestoreapi.com/products", form)
      .then((res) => {
        setData([...data, res.data]);
        setShowModal(false);
        setForm({
          title: "",
          price: "",
          category: "",
          description: "",
          image: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startUpdate = (product) => {
    setEditProduct(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`https://fakestoreapi.com/products/${editProduct}`, form)
      .then(() => {
        setData(
          data.map((item) =>
            item.id === editProduct ? { ...item, ...form } : item
          )
        );
        setEditProduct(null);
      setShowModalUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="item">
      <div className="container">
        <button className="btn" onClick={() => setShowModal(true)}>
          {t('add')}
        </button>

        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card_content">
                <h2>{item.title}</h2>
                <h3>{item.price} $</h3>
                <h4>{item.category}</h4>
                <p>{item.description}</p>
                <div className="btns">
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    {t('delete')}
                  </button>
                  <button className="update" onClick={() => { startUpdate(item); setShowModalUpdate(true);}}>{t('update')}</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <>
          <div className="modal">
            <div className="text">
              <h5 className="name">{t('name')}</h5>
              <IoMdClose
                onClick={() => setShowModal(false)}
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="title"
                required
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="price"
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="category"
                required
              />
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="description"
                required
              />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="image url"
                required
              />
              <button type="submit" className="add_btn">
                {t('add')}
              </button>
            </form>
          </div>
          <div className="overlay" onClick={() => setShowModal(false)}></div>
        </>
      )}

      {showModalUpdate && (
        <>
          {editProduct && (
           <section>
             <div className="modal">
            <div className="text">
              <h5 className="name">{t('updateProduct')}</h5>
              <IoMdClose
                onClick={() => setShowModalUpdate(false)}
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                }}
              />
            </div>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="title"
                required
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="price"
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="category"
                required
              />
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="description"
                required
              />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="image url"
                required
              />
              <button type="submit" className="add_btn">
                {t('update')}
              </button>
            </form>
          </div>
          <div
            className="overlay"
            onClick={() => setShowModalUpdate(false)}
          ></div>
           </section>
          )}
        </>
      )}
    </section>
  );
}
