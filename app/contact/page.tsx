// Customer service contact information
const CUSTOMER_SERVICE = {
  whatsapp: "+1 (618) 850-9790",
  email: "carryluxe3@gmail.com",
  phone: "+1 (618) 850-9790",
}

const ContactPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Contact Us</h1>
      <p className="mb-5">We'd love to hear from you! Please use the information below to get in touch.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Customer Service</h2>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${CUSTOMER_SERVICE.email}`} className="text-blue-500">
              {CUSTOMER_SERVICE.email}
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${CUSTOMER_SERVICE.phone}`} className="text-blue-500">
              {CUSTOMER_SERVICE.phone}
            </a>
          </p>
          <p>
            <strong>WhatsApp:</strong>{" "}
            <a href={`https://wa.me/${CUSTOMER_SERVICE.whatsapp}`} className="text-blue-500">
              {CUSTOMER_SERVICE.whatsapp}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Other Inquiries</h2>
          <p>For all other inquiries, please fill out the form below.</p>
          {/* Add a contact form here if needed */}
          <p>Form coming soon!</p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
