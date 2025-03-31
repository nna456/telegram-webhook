const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '123456', // ជំនួសដោយ app_id ពី Pusher
    key: 'a1b2c3d4e5f6g7h8', // ជំនួសដោយ key ពី Pusher
    secret: 'x9y8z7w6v5u4t3s2', // ជំនួសដោយ secret ពី Pusher
    cluster: 'ap1', // ជំនួសដោយ cluster ពី Pusher
    useTLS: true
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // ទទួល Callback Query ពី Telegram
        const callbackQuery = req.body.callback_query;
        if (callbackQuery && callbackQuery.data.startsWith('success_')) {
            // ទាញទិន្ន័យចេញពី callback_data (ឧ. success_123_1.00$_100 ពេជ្រ)
            const [_, freefireId, boxValue, diamondValue] = callbackQuery.data.split('_');
            const response = {
                status: 'success',
                freefireId, // ឧ. '123'
                boxValue,   // ឧ. '1.00$'
                diamondValue // ឧ. '100 ពេជ្រ'
            };

            // ផ្ញើទិន្ន័យទៅ Pusher channel
            await pusher.trigger('my-channel', 'success-event', response);
            console.log('Sent to Pusher:', response);

            // ឆ្លើយតបទៅ Telegram
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid callback data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
