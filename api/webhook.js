module.exports = (req, res) => {
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
            console.log('Received Callback:', response);
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid callback data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
