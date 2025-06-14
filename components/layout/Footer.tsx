import type React from "react"

const Footer: React.FC = () => {
  // Customer service contact information
  const CUSTOMER_SERVICE = {
    whatsapp: "+1 (618) 850-9790",
    email: "carryluxe3@gmail.com",
    phone: "+1 (618) 850-9790",
  }

  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      <div>
        <p>Customer Service:</p>
        <p>WhatsApp: {CUSTOMER_SERVICE.whatsapp}</p>
        <p>Email: {CUSTOMER_SERVICE.email}</p>
        <p>Phone: {CUSTOMER_SERVICE.phone}</p>
      </div>
    </footer>
  )
}

export default Footer
