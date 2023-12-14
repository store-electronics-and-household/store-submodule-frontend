import React, { useState } from 'react';
import cart from '../../image/icons/busket_icon-white.svg';
import ThumbsSlider from '../ThumbsSlider/ThumbsSlider';
import plusIconActive from '../../image/icons/cart_plus_icon_active.svg';
import minusIconActive from '../../image/icons/cart_minus_icon_active.svg';
import { productSpecifyName } from '../../utils/constants';
import PopupAddToCart from '../PopupAddToCart/PopupAddToCart';
import ProductCharacteristicsList from '../ProductCharacteristicsList/ProductCharacteristicsList';
import {
  type productDataType,
  type productAttributesDataType,
} from '../../utils/types';
import { formatSumm } from '../../utils/formatSumm';
import PopupProductPhoto from '../PopupProductPhoto/PopupProductPhoto';
import CardLikeBtn from '../CardLikeBtn/CardLikeBtn';

const objectKeys = (
  object: productAttributesDataType
): Array<keyof productAttributesDataType> => {
  return Object.keys(object) as Array<keyof productAttributesDataType>;
};

interface ProductPageProps {
  product: productDataType;
  attributes: productAttributesDataType;
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  attributes,
}: ProductPageProps) => {
  const [isActive, setIsActive] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupFullPhotoOpen, setIsPopupFullPhotoOpen] = useState(false);
  const [count, setCount] = useState(product.quantityInCart);
  const [isQuantityBtn, setIsQuantityBtn] = useState(false);

  const handleOnAllcharacteristics = (): void => {
    setIsActive(false);
  };

  const handleOnAboutProduct = (): void => {
    setIsActive(true);
  };

  const handleOpenPopupPhoto = (): void => {
    setIsPopupFullPhotoOpen(true);
  };

  const handleClosePopupFullPhoto = (): void => {
    setIsPopupFullPhotoOpen(false);
  };

  const setTimeOutInfoPopup = (): void => {
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 5000);
  };

  const openInfoPopup = (): void => {
    setIsPopupOpen(true);
    setTimeOutInfoPopup();
  };

  const increaseQuantity = (): void => {
    setCount((count) => {
      return count + 1;
    });
  };

  const decreaseQuantity = (): void => {
    setCount((count) => {
      return count - 1;
    });
  };

  const handleAddToCart = (): void => {
    increaseQuantity();
    openInfoPopup();
    count === 0 && setIsQuantityBtn(true);
  };

  const handleDeleteFromCart = (): void => {
    decreaseQuantity();
    count === 1 && setIsQuantityBtn(false);
  };

  return (
    <>
      <section className='product-page'>
        <div className='product-page__head-container'>
          <h1 className='product-page__header'>{product.name}</h1>
          <span className='product-page__item-number'>
            Арт. <span>{product.id}</span>
          </span>
        </div>
        <div className='product-page__info-container'>
          <div className='product-page__slider'>
            <ThumbsSlider
              images={product.images}
              onPopupFullPhoto={handleOpenPopupPhoto}
            />
          </div>
          <div className='product-page__characteristics'>
            <h2 className='product-page__characteristic-head'>
              Характеристики:
            </h2>
            <ProductCharacteristicsList
              productSpecifyName={productSpecifyName}
              productSpecifyValue={attributes}
              keysList={objectKeys(attributes)
                .filter((n) => {
                  return n;
                })
                .splice(0, 10)}
            />
            <a
              href='#characteristics-anchor'
              onClick={handleOnAllcharacteristics}
              className='product-page__all-characteristics'
            >
              Все характеристики
            </a>
          </div>
          <div className='product-page__price-block'>
            <div className='product-page__price'>
              <span className={`product-page__current-price ${product.oldPrice !== undefined ? 'product-page__current-price_sale' : ''}`}>
                {formatSumm(product.price)}
              </span>
              {product.oldPrice !== 0
                ? (<span className='product-page__old-price'>
                    {product.oldPrice !== 0 && typeof product.oldPrice === 'number'
                      ? formatSumm(product.oldPrice)
                      : ''}
                  </span>)
                : null
              }
            </div>
            <div className='product-page__buttons'>

              <div>
                {!isQuantityBtn
                  ? <button
                      onClick={handleAddToCart}
                      className='product-page__button-basket'
                    >
                      В корзину
                      <img
                        className='product-page__cart-icon'
                        src={cart}
                        alt='корзина покупок, магазин'
                      />
                    </button>
                  : <div className='product__quantity-button'>
                      <button
                        className={`product__quantity-button-symbol ${product.quantityInCart === 1 ? 'product__quantity-button-symbol_inactive' : ''}`}
                        onClick={handleDeleteFromCart}
                      >
                        <img className='product__quantity-button-icon' src={minusIconActive} alt='Уменьшить количество' />
                      </button>
                      <p className='product__quantity-button-number'>{count}</p>
                      <button
                        className='product__quantity-button-symbol'
                        onClick={handleAddToCart}
                      >
                        <img className='product__quantity-button-icon' src={plusIconActive} alt='Увеличить количество' />
                      </button>
                    </div>
                }
              </div>
              <CardLikeBtn isLikedCard={product.isLiked}/>
            </div>
            <ul className='product-page__benefits-list'>
              <li className='product-page__benefit'>
                <p className='product-page__benefit-text'>Доставка сегодня – 300 ₽
                </p>
              </li>
              <li className='product-page__benefit'>
                <p className='product-page__benefit-text'>
                  Самовывоз – бесплатно
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div
          id='characteristics-anchor'
          className='product-page__about-product'
        >
          <div className='product-page__about-header'>
            <button
              onClick={handleOnAboutProduct}
              className={`product-page__description-btn ${
                !isActive ? '' : 'product-page__description-btn_active'
              }`}
            >
              О товаре
            </button>
            <button
              onClick={handleOnAllcharacteristics}
              className={`product-page__description-btn ${
                isActive ? '' : 'product-page__description-btn_active'
              }`}
            >
              Характеристики
            </button>
          </div>
          {isActive
            ? (<div className='product-page__about'>
                {product.description.map((desc, id) => {
                  return (
                    <p key={id} className='product-page__about-description'>
                      {desc}
                    </p>
                  );
                })}
              </div>)
            : (<ProductCharacteristicsList
                productSpecifyName={productSpecifyName}
                productSpecifyValue={attributes}
                keysList={objectKeys(attributes).filter((n) => {
                  return n;
                })}
                modifyListClass={'characteristics-list_full'}
                modifyItemClass={'characteristics-list__item_full'}
              />
              )
          }
        </div>
        <PopupProductPhoto
          images={product.images}
          isOpen={isPopupFullPhotoOpen}
          closePopup={handleClosePopupFullPhoto}
        />
        <PopupAddToCart
          isOpen={isPopupOpen}
          productName={product.name}
          photoUrl={product.images[0]}
        />
      </section>
    </>
  );
};

export default ProductPage;
