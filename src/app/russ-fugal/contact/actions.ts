'use server';

import { headers } from 'next/headers';

export async function trackContactDownload() {
  const headersList = await headers();

  // Analytics tracking - replace with your actual endpoint if desired
  console.log('Contact download tracked:', {
    event: 'contact_download',
    timestamp: new Date().toISOString(),
    userAgent: headersList.get('user-agent'),
    referer: headersList.get('referer'),
  });
}

export async function getVCard() {
  await trackContactDownload();

  return `BEGIN:VCARD
VERSION:3.0
FN:Russ Ted Fugal
N:Fugal;Russ;Ted;;
TEL;TYPE=CELL:+1-385-214-7327
EMAIL:Russ-Fugal@read-by-ear.com
ORG:SARAs Books LLC;Smart Knowledge Systems LLC
URL:https://www.read-by-ear.com
URL:https://www.smart-knowledge-systems.com
X-SOCIALPROFILE;TYPE=bluesky:https://russ-fugal.smart-knowledge-systems.com
NOTE:Bluesky: @russ-fugal.smart-knowledge-systems.com
END:VCARD`;
}
