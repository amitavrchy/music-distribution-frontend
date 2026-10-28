import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Loader2 } from "lucide-react";
import img from "@/assets/Frame 1321317894.png";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setCartItemId } from "@/redux/features/cart/cartSlice";
import {
  useGetProductsQuery,
  Product,
  useAddItemToCartMutation,
} from "@/redux/features/commerce/commerceApi";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import ProductGallerySkeleton from "@/components/Reuseable/ProductGallerySkeleton";

interface LocalProduct {
  id: string | number;
  image: string;
  title: string;
  price: number;
}

const ProductGallery: React.FC = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState<string | number | null>(
    null,
  );
  const [loadingProduct, setLoadingProduct] = useState<string | number | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const user = useCurrentUser();
  const [addItemToCart] = useAddItemToCartMutation();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetProductsQuery({ isActive: true });

  const fetchedProducts: LocalProduct[] = (response?.data || []).map(
    (p: Product) => ({
      id: p.id,
      image: p.imageUrl,
      title: p.name,
      price: p.price,
    }),
  );

  const handleAddToCart = async (
    e: React.MouseEvent,
    product: LocalProduct,
  ) => {
    e.stopPropagation();

    if (!user?.id) {
      navigate("/login");
      return;
    }

    setLoadingProduct(product.id);

    // If user is logged in, sync with API
    if (user?.id) {
      try {
        const cartResponse = await addItemToCart({
          userId: user.id,
          productId: product.id.toString(),
          quantity: 1,
        }).unwrap();

        if (cartResponse.id) {
          dispatch(
            setCartItemId({ id: product.id, cartItemId: cartResponse.id }),
          );
        }
        setShowFeedback(product.id);
        setTimeout(() => setShowFeedback(null), 1000);
      } catch (error) {
        console.error("Failed to sync cart with API:", error);
      }
    }

    setLoadingProduct(null);
  };

  const renderProducts = (
    sliceStart: number,
    sliceEnd: number,
    cols: number,
  ) => (
    <div className="px-4 md:px-8 py-3">
      <div className={`grid grid-cols-2 md:grid-cols-${cols} gap-2 md:gap-5`}>
        {fetchedProducts.slice(sliceStart, sliceEnd).map((product) => (
          <div
            key={product.id}
            className="relative cursor-pointer group"
          >
            {/* Product Image Container */}
            <div
              onClick={() => navigate(`/details/${product.id}`)}
              className="aspect-square bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Add to Cart Button (Visible on mobile, hover on desktop) */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                disabled={loadingProduct === product.id}
                className={`absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 
                ${showFeedback === product.id ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} 
                text-white p-2 md:px-4 md:py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium
                transition-all duration-300 z-10 shadow-lg 
                ${loadingProduct === product.id ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
                opacity-100 md:opacity-0 md:group-hover:opacity-100`}
              >
                {loadingProduct === product.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="hidden md:inline">Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span className="text-white hidden md:inline">
                      {showFeedback === product.id ? "Added!" : "Add To Cart"}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-between items-center gap-2 mt-2 px-1">
              <h1 className="text-white text-sm font-medium truncate flex-1">{product.title}</h1>
              <p className="text-white text-sm font-semibold shrink-0">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-5 w-full min-w-0">
      <div id="product-lineup" className="mb-6">
        <h1 className="text-white tracking-[0.2em] uppercase text-xl">
          Browse Our
        </h1>
        <h2 className="text-white text-2xl font-bold tracking-[0.2em] uppercase">
          Product Line Up
        </h2>
      </div>

      {isLoading ? (
        <>
          <ProductGallerySkeleton count={3} />
          <ProductGallerySkeleton count={3} />
          <div className="my-8 px-4 md:px-8">
            <div className="w-full h-48 rounded-xl bg-gray-800 animate-pulse" />
          </div>
          <ProductGallerySkeleton count={3} />
        </>
      ) : isError ? (
        <div className="text-red-500 text-center py-10">
          Error loading products.
        </div>
      ) : fetchedProducts.length === 0 ? (
        <p className="text-center text-gray-400 py-16">
          The shop is empty right now.
        </p>
      ) : (
        <>
          {renderProducts(0, 3, 3)}
          {renderProducts(3, 6, 3)}

          {/* Banner */}
          <div className="my-8">
            <img src={img} className="w-full rounded-xl" alt="Hero" />
          </div>

          {renderProducts(6, 9, 3)}
        </>
      )}
    </div>
  );
};

export default ProductGallery;
