const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());

app.get('/', (req, res) => {
    res.send('Donate Now');
});

app.post('/donate', async (req, res) => {
    try {
        const product = await stripe.products.create({
            name: "Donation"
        });

        if (product) {
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 100 * 100,
                currency: "usd"
            });

            if (price.id) {
                const session = await stripe.checkout.sessions.create({
                    line_items: [{
                        price: price.id,
                        quantity: 3,
                    }],
                    mode: 'payment',
                    success_url: 'https://humanity-hub1-3599a88da879.herokuapp.com/success',
                    cancel_url: 'https://humanity-hub1-3599a88da879.herokuapp.com/cancel',
                    client_email: 'demo@gmail.com',
                });

                res.json({ url: session.url });
            }
        }
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ error: "Error processing donation" });
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
