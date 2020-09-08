import axios from "axios";

export default {
  // Get all the users for directory
  getUsers: function() {
    return axios.get("https://randomuser.me/api/?results=200&nat=us")
  }
};