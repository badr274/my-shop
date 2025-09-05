import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MainLayout from "@/layout/MainLayout.vue";
import { cookieService } from "@/utils/cookieService";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainLayout",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: HomeView,
          meta: {
            title: "Home Page",
          },
        },
        {
          path: "products",
          name: "Products",
          component: () => import("@/views/products/ProductsView.vue"),
          meta: {
            title: "Products Page",
          },
        },
        {
          path: "products/:productId",
          name: "ProductDetails",
          component: () => import("@/views/products/ProductDetailsView.vue"),
          meta: {
            title: "Product Details Page",
          },
        },
        {
          path: "/cart",
          name: "Cart",
          component: () => import("@/views/cart/CartView.vue"),
          meta: {
            requireAuth: true,
            title: "Cart Page",
          },
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/ProfileView.vue"),
          meta: {
            requireAuth: true,
            title: "Profile Page",
          },
        },
        {
          path: "/checkout",
          name: "Checkout",
          component: () => import("@/views/CheckoutView.vue"),
          meta: {
            requireAuth: true,
            title: "Checkout Page",
          },
        },
        {
          path: "/allOrders",
          name: "Orders",
          component: () => import("@/views/OrdersView.vue"),
          meta: {
            requireAuth: true,
            title: "Orders Page",
          },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/LoginView.vue"),
      meta: {
        title: "Login Page",
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/auth/SignupView.vue"),
      meta: {
        title: "Signup Page",
      },
    },

    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard/DashboardView.vue"),
      meta: {
        requireAuth: true,
        title: "Dashboard Page",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/PageNotFound.vue"),
      meta: {
        title: "404 Not Found",
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string;
  const token = cookieService.get("token");
  if (to.meta.requireAuth && !token) {
    return next("/login");
  } else if ((to.path === "/login" || to.path === "/signup") && token) {
    return next("/dashboard");
  } else {
    next();
  }
});

export default router;
