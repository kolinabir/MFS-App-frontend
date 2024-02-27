import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

const SendMoney = () => {
  const [formData, setFormData] = useState({
    mobileNo: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const token = localStorage.getItem("token");
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileNumber = formData.mobileNo;
    const amount = formData.amount;

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        "https://mfs-app-backend.vercel.app/transaction/send-money",
        { mobileNumber, amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: String(token),
          },
        }
      );

      const data = response.data;
      if (data.error) {
        toast.toast({
          title: "Money Sent Failed!",
        });
      } else {
        toast.toast({
          title: "Money Sent Successfully!",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.toast({
          title: error.response.data.message,
        });
      }
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  return (
    <div className="flex items-center justify-center  h-screen">
      <div className="w-full max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="mobileNo"
              className="block text-sm font-medium text-gray-600"
            >
              Receiver
            </label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Receiver Mobile Number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Amount"
              required
            />
          </div>
          <button
            type="submit"
            className={cn(
              "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600",
              loading &&
                "cursor-not-allowed bg-blue-300 hover:bg-blue-300 focus:bg-blue-300"
            )}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Money"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
