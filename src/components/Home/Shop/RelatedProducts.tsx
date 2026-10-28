import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setCartItemId } from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import {
  useAddItemToCartMutation,
  useGetProductsQuery,
} from "@/redux/features/commerce/commerceApi";

const GAP = 24;

const RelatedProducts: React.FC = () => {
  const { id: currentProductId } = useParams<{ id: string }>();
  const { openCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadingProduct, setLoadingProduct] = useState<string | number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetProductsQuery({ limit: 20, isActive: true });

  const products =
    productsResponse?.data?.filter(
      (p) => p.id.toString() !== currentProductId
    ) || [];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [addItemToSync] = useAddItemToCartMutation();

  const getCardWidth = useCallback(() => {
    if (!scrollContainerRef.current) return 0;
    const containerWidth = scrollContainerRef.current.clientWidth;
    return (containerWidth - GAP * (visibleItems - 1)) / visibleItems;
  }, [visibleItems]);

  const scrollToIndex = useCallback(
    (index: number, animate = true) => {
      if (!scrollContainerRef.current) return;
      const cardWidth = getCardWidth();
      const scrollPos = index * (cardWidth + GAP);
      scrollContainerRef.current.scrollTo({
        left: scrollPos,
        behavior: animate ? "smooth" : "instant",
      });
    },
    [getCardWidth]
  );

  // Initialize scroll position past the prefix clone
  useEffect(() => {
    if (products.length > 0) {
      scrollToIndex(products.length, false); // Start at the real set (after clone prefix)
      setCurrentIndex(0);
    }
  }, [products.length]); // eslint-disable-line

  // Re-adjust scroll position on window resize
  useEffect(() => {
    if (products.length > 0) {
      scrollToIndex(products.length + currentIndex, false);
    }
  }, [visibleItems]); // eslint-disable-line

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex % products.length);
    scrollToIndex(products.length + newIndex);
    setTimeout(() => {
      isAnimating.current = false;
    }, 400);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const newIndex = currentIndex - 1;
    const wrapped = ((newIndex % products.length) + products.length) % products.length;
    setCurrentIndex(wrapped);
    scrollToIndex(products.length + newIndex);
    setTimeout(() => {
      isAnimating.current = false;
    }, 400);
  };

  // After smooth scroll finishes, silently jump to real position if we're in a clone zone
  const handleScrollEnd = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const cardWidth = getCardWidth();
    const scrollPos = scrollContainerRef.current.scrollLeft;
    const totalItems = products.length * 3; // prefix + real + suffix clones
    const realStart = products.length * (cardWidth + GAP);
    const realEnd = products.length * 2 * (cardWidth + GAP);

    // If we've scrolled into the suffix clone zone, jump back to real start silently
    if (scrollPos >= realEnd) {
      const offset = scrollPos - realEnd;
      scrollContainerRef.current.scrollTo({
        left: realStart + offset,
        behavior: "instant",
      });
    }
    // If we've scrolled into the prefix clone zone, jump to real end silently
    if (scrollPos < realStart - 1) {
      const offset = realStart - scrollPos;
      scrollContainerRef.current.scrollTo({
        left: realEnd - offset,
        behavior: "instant",
      });
    }
    void totalItems;
  }, [getCardWidth, products.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scrollend", handleScrollEnd);
    return () => el.removeEventListener("scrollend", handleScrollEnd);
  }, [handleScrollEnd]);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-gray-400">
        Discovering more items...
      </div>
    );
  }

  if (isError || products.length === 0) return null;

  // Triple the products: [clone-suffix | real | clone-prefix]
  const loopedProducts = [...products, ...products, ...products];

  const relatedSectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardStyle = {
    flex: `0 0 calc((100% - ${GAP * (visibleItems - 1)}px) / ${visibleItems})`,
    minWidth: 0,
  };

  return (
    <motion.div
      variants={relatedSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-20 border-t border-gray-900 pt-20"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-400">
          RELATED PRODUCTS
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full transition-colors border border-gray-700 cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
            style={{ width: "40px", height: "40px" }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full transition-colors border border-gray-700 cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
            style={{ width: "40px", height: "40px" }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex no-scrollbar"
          style={{ gap: `${GAP}px`, overflowX: "hidden" }}
        >
          {loopedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="group cursor-pointer relative shrink-0"
              style={cardStyle}
            >
              <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden rounded-2xl bg-gray-900/50 relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-2xl opacity-0 group-hover:opacity-100">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!user?.id) {
                          navigate("/login");
                          return;
                        }
                        setLoadingProduct(product.id);
                        try {
                          const response = await addItemToSync({
                            userId: user.id,
                            productId: product.id.toString(),
                            quantity: 1,
                          }).unwrap();
                          if (response.id) {
                            dispatch(setCartItemId({ id: product.id, cartItemId: response.id }));
                          }
                        } catch (error) {
                          console.error("Failed to add related product:", error);
                        } finally {
                          setLoadingProduct(null);
                        }
                        openCart();
                      }}
                      className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300 cursor-pointer disabled:opacity-75"
                      title="Add To Cart"
                      disabled={loadingProduct === product.id}
                    >
                      {loadingProduct === product.id ? (
                        <Loader2 size={24} className="animate-spin text-white" />
                      ) : (
                        <ShoppingCart size={28} className="text-white" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-2 w-full">
                  <div className="flex flex-row items-center gap-2">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1 text-white flex-1">
                      {product.name}
                    </h3>
                    <p className="text-emerald-400 font-semibold text-lg whitespace-nowrap shrink-0">
                      ${product.price ? product.price.toFixed(2) : "0.00"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {products.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(products.length + index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-blue-600 w-8"
                  : "bg-gray-600 w-2 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RelatedProducts;
