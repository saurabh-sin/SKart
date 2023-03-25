import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { updateProducts } from '../../redux/apiCalls';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [updateProduct, setUpdateProduct] = useState(product);

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProducts(product._id, updateProduct, dispatch);
  };

  const handleChange = (e) => {
    if (e.target.name == 'img') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setUpdateProduct({
          ...updateProduct,
          [e.target.name]: reader.result,
        });
      };
    } else {
      setUpdateProduct({
        ...updateProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  console.log(product);
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('orders/income?pid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={pStats} dataKey='Sales' title='Sales Performance' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.img} alt='' className='productInfoImg' />
            <span className='productName'>{product.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{product._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>sales:</span>
              <span className='productInfoValue'>5123</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>in stock:</span>
              <span className='productInfoValue'>{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              type='text'
              placeholder={product.title}
              value={updateProduct.title}
              onChange={handleChange}
              name='title'
            />
            <label>Product Description</label>
            <input
              type='text'
              placeholder={product.desc}
              value={updateProduct.desc}
              onChange={handleChange}
              name='desc'
            />
            <label>Price</label>
            <input
              type='text'
              placeholder={product.price}
              value={updateProduct.price}
              onChange={handleChange}
              name='price'
            />
            <label>In Stock</label>
            <select name='inStock' id='idStock'>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img
                src={updateProduct.img}
                alt=''
                className='productUploadImg'
              />
              <label for='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                onChange={handleChange}
                name='img'
              />
            </div>
            <button className='productButton' onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
