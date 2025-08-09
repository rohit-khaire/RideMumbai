const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.createSubscription = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const subscription = await instance.subscriptions.create({
            plan_id: req.body.planId,
            customer_notify: 1,
            total_count: 12
        });

        res.json(subscription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyPayment = (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.json({ msg: "Payment verified successfully" });
        } else {
            res.status(400).json({ msg: "Invalid signature" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
