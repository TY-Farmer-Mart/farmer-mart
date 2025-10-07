import { Button } from "@/components/common/ui/Button";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function DeliveryLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState<string | null>("Bangalore - 560004");

  const [savedAddresses, setSavedAddresses] = useState([
    {
      name: "Bangalore - 560004",
      details: "4th model house, 4th Model Street, NR Circle",
    },
  ]);

  const handleSubmit = async () => {
    if (pincode.trim().length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await res.json();
        let newAddress: string;

        if (data[0].Status === "Success") {
          const district = data[0].PostOffice[0].District;
          newAddress = `${district} - ${pincode}`;
        } else {
          newAddress = `Unknown Area - ${pincode}`;
        }

        setLocation(newAddress);
        setSavedAddresses((prev) => [
          { name: newAddress, details: "Added via pincode" },
          ...prev.filter((_, i) => i < 1),
        ]);
        setPincode("");
        setIsOpen(false);
      } catch {
        alert("Unable to fetch location");
      }
    } else {
      alert("Please enter a valid 6-digit pincode");
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await res.json();
            const addr = data.address;
            const mainArea =
              addr.city || addr.town || addr.village || "Unknown Area";
            const newAddress = `${mainArea} - Current`;

            setLocation(newAddress);
            setSavedAddresses((prev) => [
              { name: newAddress, details: "Added via current location" },
              ...prev.filter((_, i) => i < 1),
            ]);
            setIsOpen(false);
          } catch {
            alert("Unable to fetch location");
          }
        },
        () => alert("Location access denied!")
      );
    } else {
      alert("Geolocation not supported in this browser");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Deliver to:</span>
          <span className="font-semibold">{location}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="textLink" size="sm" onClick={() => setIsOpen(true)}>
            Change
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-[400px] p-6 relative">
            <Button variant="close" onClick={() => setIsOpen(false)}>
              ✕
            </Button>

            <h2 className="font-semibold mb-3 text-lg">
              Select Delivery Address
            </h2>

            {savedAddresses.map((addr, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border p-3 rounded mb-4 cursor-pointer"
                onClick={() => {
                  setLocation(addr.name);
                  setIsOpen(false);
                }}
              >
                <input type="radio" name="address" />
                <div>
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-sm text-gray-600">{addr.details}</p>
                </div>
              </div>
            ))}

            <div className="mb-3">
              <p className="font-medium text-sm mb-2">
                Use pincode to check delivery info
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={6}
                />
                <Button variant="submit" size="md" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>

            <Button
              variant="location"
              size="md"
              onClick={handleCurrentLocation}
            >
              <span className="flex items-center gap-2">
                <MapPin size={16} /> Use my current location
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
