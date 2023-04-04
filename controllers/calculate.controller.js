const calculation = async (req, res) => {
    let { p, i, n } = req.body;
    try {
        i = i / 100;
        let matuarity_value = p * ((((1 + i) ** n) - 1) / i);
        let invested_amount = p * n;
        let interest_gained = matuarity_value - invested_amount;
        res.status(200).send({ matuarity_value, invested_amount, interest_gained });

    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": error.message });
    }
}

module.exports = { calculation };