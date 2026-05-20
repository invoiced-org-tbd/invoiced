import { handleAbacateWebhookEvent } from '@/api/subscription/handleAbacateWebhookEvent';
import { envServer } from '@/lib/envServer';
import { verifyAbacateWebhookSignature } from '@/lib/verifyAbacateWebhook';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/webhooks/abacatepay')({
	server: {
		handlers: {
			POST: async ({ request }: { request: Request }) => {
				const url = new URL(request.url);
				const webhookSecret = url.searchParams.get('webhookSecret');

				if (webhookSecret !== envServer.ABACATEPAY_WEBHOOK_SECRET) {
					return new Response(JSON.stringify({ error: 'Unauthorized' }), {
						status: 401,
						headers: { 'Content-Type': 'application/json' },
					});
				}

				const rawBody = await request.text();
				const signature = request.headers.get('X-Webhook-Signature');

				if (!verifyAbacateWebhookSignature(rawBody, signature)) {
					return new Response(JSON.stringify({ error: 'Invalid signature' }), {
						status: 401,
						headers: { 'Content-Type': 'application/json' },
					});
				}

				try {
					const payload = JSON.parse(rawBody) as {
						id: string;
						event: string;
						apiVersion: number;
						devMode: boolean;
						data: Record<string, unknown>;
					};

					await handleAbacateWebhookEvent(payload);

					return new Response(JSON.stringify({ received: true }), {
						status: 200,
						headers: { 'Content-Type': 'application/json' },
					});
				} catch {
					return new Response(JSON.stringify({ error: 'Processing failed' }), {
						status: 500,
						headers: { 'Content-Type': 'application/json' },
					});
				}
			},
		},
	},
});
