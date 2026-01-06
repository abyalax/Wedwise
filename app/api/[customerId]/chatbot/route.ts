import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { env } from '~/common/const/credential';
import { safeHandler } from '~/lib/handler/safe-handler';

function parseMessage(content: string): string {
  return content
    .replace(/\s+/g, ' ') // multiple spaces jadi 1
    .replace(/[.]{2,}/g, '...') // multiple dots
    .slice(0, 200); // hard limit per message
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO date string
}

type ConversationMessages = ConversationMessage[];

export const POST = safeHandler(async (req): Promise<NextResponse<{ message: string; history: ConversationMessages }>> => {
  const body = await req.json();
  //   const guestId = body.guestId;
  const message = parseMessage(body.message); // todo: make sure no get sensitive data,

  const STATIC_SYSTEM_INSTRUCTION = `
    Kamu adalah AI-vitation, chatbot untuk undangan digital. 
    Jawaban maksimal 3-5 kalimat, santai tapi informatif. 
    Jangan lupa ingatkan RSVP.
  `;

  const ai = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: message, // todo: parsed, minimize and trim
    config: {
      systemInstruction: STATIC_SYSTEM_INSTRUCTION,
    },
  });

  return NextResponse.json({
    message: response.text as string, // todo: handling if error
    history: [],
  });
});

/**
Example response
{
    "guest": {
        "id": 1,
        "customerId": 1,
        "phone": "087765290292",
        "name": "Budi Santoso",
        "participant": 3,
        "status": "Invited",
        "note": "Bawa keluarga kecil",
        "rsvpAt": null,
        "createdAt": "2025-09-28T04:15:56.424Z",
        "updatedAt": "2025-09-28T04:15:56.424Z",
        "customer": {
            "id": 1,
            "userId": 1,
            "weddingDate": "2025-12-20",
            "theme": "classic",
            "status": "Active",
            "note": "Customer pertama"
        },
        "conversations": [
            {
                "id": 1,
                "guestId": 1,
                "customerId": 1,
                "invitationId": 1,
                "messages": [
                    {
                        "role": "user",
                        "content": "Hallo ada apa saja nanti di acara pernikahan ?",
                        "timestamp": "2025-09-28T04:32:18.623Z"
                    },
                    {
                        "role": "assistant",
                        "content": "Pada acara pernikahan, kami memiliki berbagai vendor yang memberikan layanan terbaik, seperti Music Studio, Event Organizer, Aest Decoration, MUA, Lila Catering (menu makanan) dll. Kita dapat mengkonfirmasi kehadiran lewat RSVP.",
                        "timestamp": "2025-09-28T04:32:21.623Z"
                    }
                ],
                "lastInteraction": "2025-09-28T04:32:18.624Z",
                "createdAt": "2025-09-28T04:32:18.627Z",
                "updatedAt": "2025-09-28T04:32:18.627Z"
            }
        ]
    },
    "invitation": {
        "id": 1,
        "customerId": 1,
        "name": "Wedding Invitation",
        "theme": "classic",
        "weddingDate": "2025-12-13",
        "aiContext": "pernikahan kami memakai tema classic, sarankan pada tamu agar menggunakan pakaian putih agar match dengan tema kami",
        "createdAt": "2025-09-28T04:15:56.455Z",
        "updatedAt": "2025-09-28T04:15:56.455Z"
    },
    "existingConversation": {
        "id": 1,
        "guestId": 1,
        "customerId": 1,
        "invitationId": 1,
        "messages": [
            {
                "role": "user",
                "content": "Hallo ada apa saja nanti di acara pernikahan ?",
                "timestamp": "2025-09-28T04:32:18.623Z"
            },
            {
                "role": "assistant",
                "content": "Pada acara pernikahan, kami memiliki berbagai vendor yang memberikan layanan terbaik, seperti Music Studio, Event Organizer, Aest Decoration, MUA, Lila Catering (menu makanan) dll. Kita dapat mengkonfirmasi kehadiran lewat RSVP.",
                "timestamp": "2025-09-28T04:32:21.623Z"
            }
        ],
        "lastInteraction": "2025-09-28T04:32:18.624Z",
        "createdAt": "2025-09-28T04:32:18.627Z",
        "updatedAt": "2025-09-28T04:32:18.627Z"
    },
    "messages": "Halo",
    "response": "Halo! Di acara pernikahan kami tanggal 13 Desember 2025 nanti, pastinya akan ada banyak kebahagiaan dan momen indah dengan sentuhan klasik yang elegan. Kami sangat senang bisa merayakan cinta kami bersama kalian semua.\n\nOh ya, kami juga sangat menyarankan untuk memakai busana berwarna putih agar semakin serasi dengan tema klasik pernikahan kami. Jangan lupa konfirmasi kehadiranmu (RSVP) ya! Kami tunggu.",
    "fullresponse": {
        "sdkHttpResponse": {
            "headers": {
                "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
                "content-encoding": "gzip",
                "content-type": "application/json; charset=UTF-8",
                "date": "Sun, 28 Sep 2025 08:52:17 GMT",
                "server": "scaffolding on HTTPServer2",
                "server-timing": "gfet4t7; dur=4639",
                "transfer-encoding": "chunked",
                "vary": "Origin, X-Origin, Referer",
                "x-content-type-options": "nosniff",
                "x-frame-options": "SAMEORIGIN",
                "x-xss-protection": "0"
            }
        },
        "candidates": [
            {
                "content": {
                    "parts": [
                        {
                            "text": "Halo! Di acara pernikahan kami tanggal 13 Desember 2025 nanti, pastinya akan ada banyak kebahagiaan dan momen indah dengan sentuhan klasik yang elegan. Kami sangat senang bisa merayakan cinta kami bersama kalian semua.\n\nOh ya, kami juga sangat menyarankan untuk memakai busana berwarna putih agar semakin serasi dengan tema klasik pernikahan kami. Jangan lupa konfirmasi kehadiranmu (RSVP) ya! Kami tunggu."
                        }
                    ],
                    "role": "model"
                },
                "finishReason": "STOP",
                "index": 0
            }
        ],
        "modelVersion": "gemini-2.5-flash",
        "responseId": "QffYaKjxB67H0-kPvdC-8A8",
        "usageMetadata": {
            "promptTokenCount": 107,
            "candidatesTokenCount": 89,
            "totalTokenCount": 333,
            "promptTokensDetails": [
                {
                    "modality": "TEXT",
                    "tokenCount": 107
                }
            ],
            "thoughtsTokenCount": 137
        }
    }
}
 */
