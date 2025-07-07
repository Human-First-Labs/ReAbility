import type { Language } from '$lib/text-translator/types';
import { fail } from '@sveltejs/kit';
import brevo, { TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';
import { EMAIL_SENDER, EMAIL_CONTACT, BREVO_API_KEY } from '$env/static/private';

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

export interface SendEmailArgs {
	name: string;
	emailAddress: string;
	subject: string;
	message: string;
	lang: Language;
}

const internalHTMLTemplate = (args: { name: string; message: string; emailAddress: string }) => {
	const { name, message, emailAddress } = args;

	return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Message</title>
            </head>
            <body>
                <p>You've just received a message from reability.mt with the following message:</p>
                <p>${message}</p>
                <p>Reply to ${name} this message at ${emailAddress}</p>
            </body>
        </html>
    `;
};

//TODO maybe a nicer email at some point
const externalHTMLTemplate = (args: {
	name: string;
	lang: Language;
	message: string;
	emailAddress: string;
}) => {
	const { name, lang, message, emailAddress } = args;

	if (lang === 'en') {
		return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Message</title>
                </head>
                <body>
					<p>Hi ${name},</>
                    <p>This email is to confirm that we have received your email on reability.mt with the following message:</p>
                    <p>${message}</p>
                    <p>We will get back to you as soon as possible on the email address you provided (${emailAddress}).</p>
                    <p>Please do not reply as this is an automated message.</p>
                </body>
            </html>
        `;
		//TODO maltese fonts here
	} else if (lang === 'mt') {
		return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Message</title>
                </head>
                <body>
					<p>Hi ${name},</>
                    <p>Dan l-'email' qed jintbgħat biex jikonferma li irċevejna l-'email' tiegħek fuq reability.mt bil-messaġġ:</p>
                    <p>${message}</p>
                    <p>Ser inweġbuk mill-iktar fiss possibli fuq l-indirizz li provdejtilna (${emailAddress}).</p>
                    <p>Jekk joġbok tweġibx lura hawn, għax dan l-messaġġ huwa automatiku.</p>
                </body>
            </html>

        `;
	} else {
		throw new Error('Invalid language');
	}
};

export const actions = {
	sendEmail: async ({ cookies, request }) => {
		const body = await request.formData();

		const name = body.get('name')?.toString();
		const emailAddress = body.get('emailAddress')?.toString();
		const message = body.get('message')?.toString();
		const subject = body.get('subject')?.toString();
		const lang = cookies.get('lang') as Language;

		const missing: ('name' | 'emailAddress' | 'message' | 'subject')[] = [];

		if (!name) {
			missing.push('name');
		}

		if (!emailAddress) {
			missing.push('emailAddress');
		}

		if (!message) {
			missing.push('message');
		}

		if (!subject) {
			missing.push('subject');
		}

		if (!name || !emailAddress || !message || !subject || missing.length > 0) {
			return fail(400, {
				missing
			});
		}

		try {
			const internalMessage = {
				to: EMAIL_CONTACT,
				from: EMAIL_SENDER,
				subject: `New message on reability.mt; Subject - ${subject}`,
				html: internalHTMLTemplate({
					name,
					message,
					emailAddress
				})
			};
			const sendSmtpEmail = new brevo.SendSmtpEmail();

			sendSmtpEmail.subject = internalMessage.subject;
			sendSmtpEmail.htmlContent = internalMessage.html;
			sendSmtpEmail.sender = { email: internalMessage.from, name: 'Reability' };
			sendSmtpEmail.to = [{ email: internalMessage.to }];

			await apiInstance.sendTransacEmail(sendSmtpEmail);

			const externalMessage = {
				to: emailAddress,
				from: EMAIL_SENDER,
				subject: `Message confirmation on reability.mt; Subject - ${subject}`,
				html: externalHTMLTemplate({
					name,
					lang,
					message,
					emailAddress
				})
			};

			const sendSmtpEmailExternal = new brevo.SendSmtpEmail();
			sendSmtpEmailExternal.subject = externalMessage.subject;
			sendSmtpEmailExternal.htmlContent = externalMessage.html;
			sendSmtpEmailExternal.sender = { email: externalMessage.from, name: 'Reability' };
			sendSmtpEmailExternal.to = [{ email: externalMessage.to }];

			await apiInstance.sendTransacEmail(sendSmtpEmailExternal);

			return {
				success: true
			};
		} catch (e) {
			console.error(e);
			return fail(500, {
				message: 'Failed to send email',
				fullError: e
			});
		}
	}
};
