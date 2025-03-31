const Pusher = require('pusher');

const pusher = new Pusher({
    appId: 'your-app-id',      // ឧ. '123456'
    key: 'x7k9p2m4n6b8v0z1',  // ដូចគ្នានឹង client-side
    secret: 'q1w2e3r4t5y6u7i8', // ចម្លងពី Pusher dashboard
    cluster: 'ap1',            // ដូចគ្នានឹង client-side
    useTLS: true
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const callbackQuery = req.body.callback_query;
        if (callbackQuery && callbackQuery.data.startsWith('success_')) {
            const [_, freefireId, boxValue, diamondValue] = callbackQuery.data.split('_');
            const response = {
                status: 'success',
                freefireId,
                boxValue,
                diamondValue
            };

            await pusher.trigger('my-channel', 'success-event', response);
            console.log('Sent to Pusher:', response);
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid callback data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
