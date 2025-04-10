import React from "react";

const ContactForm = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow space-y-4">
      <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <textarea placeholder="Message" rows={4} className="w-full p-2 border rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
