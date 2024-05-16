"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { addOrUpdateProductToCart } from "@/lib/cart";
import { useCart } from "@/context/CartContext/CartState";
import { isProductInCart } from "@/lib/cart";
import { CiShoppingBasket } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { ToolTip } from "./ToolTip";

type AddToCartBtnProps = {
  productId: number;
  productQty: number;
  fullWidth?: boolean;
};

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
  productId,
  productQty,
  fullWidth = false,
}) => {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { fetchCartProducts } = useCart();

  const addToCartClicked = async () => {
    if (isInCart) {
      router.push("/cart");
    } else {
      addOrUpdateProductToCart(productId, productQty);
      fetchCartProducts();
      setIsInCart(true);
      router.push("/cart");
    }
  };

  useEffect(() => {
    setIsInCart(isProductInCart(productId));
  }, []);

  useEffect(() => {
    setIsInCart(isProductInCart(productId));
  }, [productId]);

  return (
    <>
      <button
        onClick={() => addToCartClicked()}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`${
          fullWidth && "w-full"
        } flex justify-center text-white ${
          isInCart
            ? "bg-green-400 hover:bg-green-500"
            : "bg-orange-400 hover:bg-orange-500 text-sm"
        }  font-medium rounded-lg px-5 py-2.5 text-center text-xl relative`}
      >
        {isInCart ? <CiShoppingBasket /> : <FaCartPlus />}
        {/* {!fullWidth && (
                <Link href={`product/${productId}`} className='border border-gray-100 hover:bg-white bg-gray-100 px-4 py-2 rounded-lg text-xl'>
                    <BsArrowRight />
                </Link>
            )} */}

        {showTooltip && (
          // login for showing Cart and add to cart 
          <ToolTip text={isInCart ? "Cart" : "Add to Cart"}/>
        )}
      </button>
    </>
  );
};

export default AddToCartBtn;
