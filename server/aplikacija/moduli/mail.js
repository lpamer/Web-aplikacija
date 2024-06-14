const nodemailer = require("nodemailer");

let mailer = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: "pamerluka@gmail.com",
		pass: "pkwf rltm ygsr chsh",
	},
});

exports.posaljiMail = async function (salje, prima, predmet, poruka) {
	message = {
		from: salje,
		to: prima,
		subject: predmet,
		text: poruka,
	};

	let odgovor = await mailer.sendMail(message);
	console.log(odgovor);
	return odgovor;
};
