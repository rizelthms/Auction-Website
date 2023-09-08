<script>
  import router from "page";

  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import Admin from "./pages/Admin.svelte";
  import Auction from "./pages/Auction.svelte";
  import ItemAdd from "./pages/ItemAdd.svelte";
  import { userLogin, adminLogin } from "./lib/api.js";
  import { userInfo } from "./lib/Store.js"
  import { SvelteToast } from "@zerodevx/svelte-toast";

  function is_logged_in_client() {
    return $userInfo && $userInfo.name && !$userInfo.isAdmin;
  }
  function is_logged_in_admin() {
    return $userInfo && $userInfo.name && $userInfo.isAdmin;
  }

  let page;
  let params = {};

  router("/", (ctx) => {
    return router.show("/client/login");
  });
  router("/client/login", (ctx) => {
    if (is_logged_in_client()) {
      return router.show("/auction");
    }
    page = Login;
    params.login_destination="/auction";
    params.login_func_async=userLogin;
    params.isAdminPage=false;
  });

  router("/register", (ctx) => {
    page = Register;
  });

  router("/auction", (ctx) => {
    if (!is_logged_in_client()) {
      return router.show("/client/login");
    }
    page = Auction;
  });

  router("/admin/login", (ctx) => {
    if (is_logged_in_admin()) {
      return router.show("/admin");
    }
    page = Login;
    params.login_destination="/admin";
    params.login_func_async=adminLogin;
    params.isAdminPage=true;
  });

  router("/admin", (ctx) => {
    if (!is_logged_in_admin()) {
      return router.show("/admin/login");
    }
    page = Admin;
  });

  router("/admin/additem", (ctx) => {
    if (!is_logged_in_admin()) {
      return router.show("/admin/login");
    }
    page = ItemAdd;
  });

  router.start();
</script>

<main>
  <svelte:component this={page} {params} />
  <SvelteToast />
</main>

