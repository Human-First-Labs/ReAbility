import type { Language } from '$lib/text-translator/types';
import sgMail from '@sendgrid/mail';
import { SENDGRID_KEY, SENDGRID_SENDER, SENDGRID_TARGET } from '$env/static/private';
import { fail } from '@sveltejs/kit';

sgMail.setApiKey(SENDGRID_KEY);

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
                    <p>Dan l-email qed jintbghat biex jikonferma li ircevejna l-email tieghek fuq reability.mt bil-messagg:</p>
                    <p>${message}</p>
                    <p>Inwegbuk mill-iktar fiss possibli fuq l-'email address' li provdejtilna (${emailAddress}).</p>
                    <p>Jekk jogbok twegibx lura hawn, ghax dan l-message huwa automatiku.</p>
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
				to: SENDGRID_TARGET,
				from: SENDGRID_SENDER,
				subject: `New message on reability.mt - ${subject}`,
				html: internalHTMLTemplate({
					name,
					message,
					emailAddress
				})
			};
			await sgMail.send(internalMessage);

			const externalMessage = {
				to: emailAddress,
				from: SENDGRID_SENDER,
				subject: `Message confirmation on reability.mt - ${subject}`,
				html: externalHTMLTemplate({
					name,
					lang,
					message,
					emailAddress
				})
			};
			await sgMail.send(externalMessage);

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
