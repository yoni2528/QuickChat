export let BASE_URL = "https://quickchat-4ny4.onrender.com";

if (import.meta.env.MODE === "production") {
  BASE_URL = "https://quickchat-4ny4.onrender.com";
}

if (import.meta.env.MODE === "development") {
  BASE_URL = "http://192.168.1.81:3000";
}
