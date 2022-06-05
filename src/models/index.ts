import 'dotenv/config';
import * as admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import type { Room } from '../types';

initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const db = admin.firestore();

export async function getADocument({
  collectionName,
  documentName,
}: {
  collectionName: string;
  documentName: string;
}): Promise<Room | undefined | any> {
  const collection = db.collection(`${collectionName}`);
  const document = await collection.doc(`${documentName}`).get();
  return document.data();
}
