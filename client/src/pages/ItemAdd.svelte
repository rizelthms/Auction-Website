<script>
  import Topbar from "../components/Topbar.svelte";
  import { addItem } from "../lib/api.js";
  import { toast } from "@zerodevx/svelte-toast";

  let item_description;
  let item_author;
  let item_type;
  let item_year;
  let item_startingBid;
  let item_endAt;
  async function on_item_add() {
    if (!(item_description && item_author && item_type && item_year && item_startingBid && item_endAt)) {
      toast.push("Please enter all values.", {theme: {"--toastBackground": "red"}});
      return;
    }
    if (item_startingBid <= 0) {
      toast.push("Starting bid must be greater than 0.", {theme: {"--toastBackground": "red"}});
      return;
    }
    let today = new Date();
    let endAt = document.getElementById('item_endAt').valueAsDate;
    if (endAt < today) {
      toast.push("Auction end date must be in the future.", {theme: {"--toastBackground": "red"}});
      return;
    }
    item_author = item_author[0].toUpperCase() + item_author.slice(1).toLowerCase();
    item_type = item_type[0].toUpperCase() + item_type.slice(1).toLowerCase();
    let res = await addItem({
      description: item_description,
      author: item_author,
      type: item_type,
      year: item_year,
      startingBid: item_startingBid,
      endAt: item_endAt,
    });
    if (res.status) {
      toast.push("Added item successfully.");
      const sleep = t => new Promise(resolve => setTimeout(resolve, t));
      await sleep(1200);
      window.location.href = "/admin";
    } else {
      toast.push("Server error - try again later.", {theme: {"--toastBackground": "red"}});
    }
  }
</script>

<Topbar isAdminPage=true subtitle="Fill the form to add an item!" />
<div class="container mx-auto w-4/5">
  <div class="mb-6">
    <label for="item_description" class="">Painting Title</label>
    <input bind:value={item_description} type="text" id="item_description" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter painting title" />
  </div>
  <div class="mb-6">
    <label for="item_author" class="">Artist</label>
    <input bind:value={item_author} type="text" id="item_author" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter artist name" />
  </div>
  <div class="mb-6">
    <label for="item_type" class="">Type</label>
    <input bind:value={item_type} type="text" id="item_type" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter painting type (ex.: Watercolor, Oil, etc.)" />
  </div>
  <div class="mb-6">
    <label for="item_year" class="">Year</label>
    <input bind:value={item_year} type="number" id="item_year" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter year when painting was created" />
  </div>
  <div class="mb-6">
    <label for="item_startingBid" class="">Starting Bid</label>
    <input bind:value={item_startingBid} type="number" id="item_startingBid" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter starting bid amount" />
  </div>
  <div class="mb-6">
    <label for="item_endAt" class="">Bid End Date</label>
    <input bind:value={item_endAt} type="date" id="item_endAt" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter date when bid should end (ex.: 2023-12-12)" />
  </div>
  <button on:click={on_item_add} type="submit" class="text-white bg-lime-700 hover:bg-green-800 rounded-lg px-5 py-2.5">Add Item to Auction</button>
</div>
