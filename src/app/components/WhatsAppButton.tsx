import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919380784018"; // Format: country code + number (no + or spaces)
    const message = encodeURIComponent("Hello! I would like to inquire about your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}