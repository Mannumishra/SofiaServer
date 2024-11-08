const { createContact, getAllContacts, updateContactStatus } = require("../Controllers/ContactController")

const ContactRouter = require("express").Router()

ContactRouter.post("/send-contact" ,createContact)
ContactRouter.get("/all-contact" ,getAllContacts)
ContactRouter.put("/update-contact-status/:id" ,updateContactStatus)

module.exports = ContactRouter