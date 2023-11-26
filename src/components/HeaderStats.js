import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// components

import CardStats from "@/components/Cards/CardStats.js";

export default function HeaderStats() {
  const [totalUser, setTotalUser] = useState('');
  const [totalProduct, setTotalProduct] = useState('');
  const [orderTotal, setOrderTotal] = useState('');
  const [orderItemTotal, setOrderItemTotal] = useState('');
  const [reviewTotal, setReviewTotal] = useState('');
  const [cartTotal, setCartTotal] = useState('');
  const router = useRouter();
  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('stats');
          setTotalUser(data.user_total);
          setTotalProduct(data.product_total);
          setOrderTotal(data.order_total);
          setOrderItemTotal(data.orderItem_total);
          setReviewTotal(data.review_total);
          setCartTotal(data.cart_total);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            router.push('/login');
          }

          if (error.response && error.response.status === 403) {
            router.push('/login');
          }

          if (error.response && error.response.status === 404) {
            router.push('/login');
          }
        }
      }
    )()
  }, [router])

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
              <CardStats
                statSubtitle="TOTAL USERS"
                statTitle={totalUser}
                statIconName="fas fa-users"
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
              <CardStats
                statSubtitle="TOTAL PRODUCTS"
                statTitle={totalProduct}
                statPercentColor="text-red-500"
                statIconName="fas fa-chart-pie"
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
              <CardStats
                statSubtitle="TOTAL ORDERS"
                statTitle={orderTotal}
                statIconName="fa-solid fa-truck-fast"
                statIconColor="bg-violet-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 pt-4">
              <CardStats
                statSubtitle="TOTAL ORDER ITEMS"
                statTitle={orderItemTotal}
                statIconName="fa-solid fa-shapes"
                statIconColor="bg-lime-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 pt-4">
              <CardStats
                statSubtitle="TOTAL USER REVIEWS"
                statTitle={reviewTotal}
                statIconName="fa-solid fa-star-half-stroke"
                statIconColor="bg-cyan-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 pt-4">
              <CardStats
                statSubtitle="TOTAL USER CARTS"
                statTitle={cartTotal}
                statIconName="fa-solid fa-cart-shopping"
                statIconColor="bg-rose-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}