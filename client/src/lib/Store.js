import { writable } from 'svelte/store'

// userInfo stores the logged in user info, object with:
//   name    - user name string
//   isAdmin - true/false whether its admin user or not
//   token   - authentication token used in subsequent requests
// null if not logged in
export let userInfo = writable(JSON.parse(localStorage.getItem('userInfo')));
userInfo.subscribe((value) => localStorage.setItem('userInfo', JSON.stringify(value)));
