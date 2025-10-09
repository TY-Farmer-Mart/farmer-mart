import { Button } from "@/components/common/ui/Button";
import { Address } from "@/types/cartType";
import { MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function DeliveryLocation() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [location, setLocation] = useState<string | null>(null);

  const defaultLocationName = t("DELIVERY.defaultLocationName");
  const defaultLocationDetails = t("DELIVERY.defaultLocationDetails");

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    { name: defaultLocationName, details: defaultLocationDetails },
  ]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("deliveryLocation");
    const storedAddresses = localStorage.getItem("savedAddresses");

    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      setLocation(defaultLocationName);
    }

    if (storedAddresses) {
      try {
        const parsed: Address[] = JSON.parse(storedAddresses);
        const valid: Address[] = parsed.filter(
          (addr: Address) => addr?.name?.trim() && addr?.details?.trim()
        );
        setSavedAddresses(
          valid.length
            ? valid
            : [{ name: defaultLocationName, details: defaultLocationDetails }]
        );
      } catch {
        setSavedAddresses([
          { name: defaultLocationName, details: defaultLocationDetails },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem("deliveryLocation", location);
    }
  }, [location]);

  const handleSubmit = async () => {
    if (pincode.trim().length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await res.json();

        if (data[0].Status === "Success") {
          const office = data[0].PostOffice[0];
          const district = office.District;
          const state = office.State;
          const name = office.Name;

          const newAddress = `${name}, ${district}, ${state} - ${pincode}`;
          const details = `${office.Block || ""}, ${
            office.Division || ""
          }, ${state}`;

          const updatedAddresses: Address[] = [
            { name: newAddress, details },
            ...savedAddresses.filter(
              (addr: Address) => addr?.name?.trim() && addr?.details?.trim()
            ),
          ];

          setSavedAddresses(updatedAddresses);
          setLocation(newAddress);
          localStorage.setItem("deliveryLocation", newAddress);
          localStorage.setItem(
            "savedAddresses",
            JSON.stringify(updatedAddresses)
          );

          setPincode("");
          setIsOpen(false);
        } else {
          alert(t("DELIVERY.invalidPincode"));
        }
      } catch {
        alert(t("DELIVERY.unableFetch"));
      }
    } else {
      alert(t("DELIVERY.invalidPincode"));
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
              addr.city ||
              addr.town ||
              addr.village ||
              addr.suburb ||
              "Unknown Area";
            const state = addr.state || "";
            const detectedPincode = addr.postcode || "000000";

            const newAddress = `${mainArea}, ${state} - ${detectedPincode}`;
            const details = `${
              addr.suburb || ""
            }, ${detectedPincode}, ${state}`;

            const updatedAddresses: Address[] = [
              { name: newAddress, details },
              ...savedAddresses.filter(
                (addr: Address) => addr?.name?.trim() && addr?.details?.trim()
              ),
            ];

            setSavedAddresses(updatedAddresses);
            setLocation(newAddress);
            localStorage.setItem("deliveryLocation", newAddress);
            localStorage.setItem(
              "savedAddresses",
              JSON.stringify(updatedAddresses)
            );

            setIsOpen(false);
          } catch {
            alert(t("DELIVERY.unableFetch"));
          }
        },
        () => alert(t("DELIVERY.locationAccessDenied"))
      );
    } else {
      alert(t("DELIVERY.geolocationNotSupported"));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm text-gray-700">
            {t("DELIVERY.deliverTo")}
          </span>
          <span className="font-semibold">{location}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="textLink" size="sm" onClick={() => setIsOpen(true)}>
            {t("DELIVERY.selectDeliveryAddress")}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-[300px] md:w-[450px] p-3 md:p-6 relative max-h-[80vh] overflow-auto">
            <Button variant="close" onClick={() => setIsOpen(false)}>
              <X />
            </Button>

            <h2 className="font-semibold mb-3 text-lg">
              {t("DELIVERY.selectDeliveryAddress")}
            </h2>

            <div className="max-h-[200px] overflow-y-auto mb-4">
              {savedAddresses.map((addr: Address, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border p-3 rounded mb-2 cursor-pointer"
                  onClick={() => {
                    setLocation(addr.name);
                    setIsOpen(false);
                  }}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={addr.name === location}
                    readOnly
                  />
                  <div>
                    <p className="font-medium">{addr.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">{addr.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <p className="font-medium text-xs md:text-sm mb-2">
                {t("DELIVERY.usePincode")}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder={t("DELIVERY.enterPincode")}
                  className="border p-2 rounded w-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={6}
                />
                <Button variant="submit" size="md" onClick={handleSubmit}>
                  {t("DELIVERY.submit")}
                </Button>
              </div>
            </div>

            <Button
              variant="location"
              size="md"
              onClick={handleCurrentLocation}
            >
              <span className="flex items-center gap-2">
                <MapPin size={16} /> {t("DELIVERY.useCurrentLocation")}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
