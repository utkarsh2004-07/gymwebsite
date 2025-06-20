import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available plans when the component loads
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('https://gymwebsite-is32.onrender.com//api/payment/plans', {
          withCredentials: true, // Include credentials (cookies)
        });
        console.log(response.data);
        setPlans(response.data); // Set the plans state with fetched data
      } catch (error) {
        console.error('Error fetching membership plans:', error);
      }
    };
    fetchPlans();
  }, []);

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Handle the payment process
  const handlePayment = async () => {
    if (!selectedPlan) return alert('Please select a plan.');

    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert('User is not logged in.');

      // Create order on the server
      const { data } = await axios.post(
        'https://gymwebsite-is32.onrender.com/api/payment/create-order',
        { planId: selectedPlan.id, userId }, // Pass userId in the request body
        { withCredentials: true } // Include credentials (cookies)
      );
      localStorage.setItem("plan",data.plan.description)
      // console.log(data.plan.description)
      // Razorpay payment options
      const options = {
        key: 'rzp_test_SMZCi5l8zd0Bln', // Replace with your Razorpay key_id
        amount: data.amount * 100, // Convert amount to paise
        currency: data.currency,
        name: 'Gym Membership',
        description: `Purchase ${selectedPlan.name}`,
        order_id: data.orderId,
        handler: async function (response) {
          // Verify payment on the server
          const verifyResponse = await axios.post(
            'https://gymwebsite-is32.onrender.com/api/payment/verify-payment',
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true } // Include credentials (cookies)
          );
          alert(verifyResponse.data.message);
        },
        prefill: {
          name: 'Your Name', // Prefill user details (you can fetch these from the backend if needed)
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc', // Razorpay theme color
        },
      };

      // Initialize Razorpay payment gateway
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Choose Your Membership Plan</h1>
        </div>
        
        <div className="space-y-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 border ${
                selectedPlan?.id === plan.id ? 'border-blue-500' : 'border-gray-200'
              } rounded-xl transition duration-300 hover:shadow-lg cursor-pointer`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">${plan.price}</p>
                  <button 
                    className={`px-4 py-2 rounded-lg text-white ${
                      selectedPlan?.id === plan.id ? 'bg-blue-600' : 'bg-gray-400'
                    } hover:bg-blue-700 mt-2`}
                  >
                    {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <button
          onClick={handlePayment}
          className="w-full mt-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default PaymentPage;




