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
}): Promise<{ [fieldPath: string]: any }> {
  const collection = db.collection(`${collectionName}`);
  const document = await collection.doc(`${documentName}`).get();
  return document.data();
}

export async function createADocument({
  collectionName,
  documentName,
  subCollectionName,
  data,
}: {
  collectionName: string;
  documentName: string;
  subCollectionName?: string;
  data: { [fieldPath: string]: any };
}): Promise<{ [fieldPath: string]: any }> {
  const collection = db.collection(`${collectionName}`);
  const document = subCollectionName
    ? collection
        .doc(`${documentName}`)
        .collection(`${subCollectionName}`)
        .doc(`${new Date()}`)
    : collection.doc(`${documentName}`);
  await document.set(data);
  const newDocument = (await document.get()).data();
  return newDocument;
}

export async function updateADocument({
  collectionName,
  documentName,
  data,
}: {
  collectionName: string;
  documentName: string;
  data: { [fieldPath: string]: any };
}): Promise<{ [fieldPath: string]: any }> {
  const collection = db.collection(`${collectionName}`);
  const document = collection.doc(`${documentName}`);
  await document.update(data);
  const updatedDocuent = (await document.get()).data();
  return updatedDocuent;
}

export async function deleteADocument({
  collectionName,
  documentName,
}: {
  collectionName: string;
  documentName: string;
}): Promise<void> {
  const collection = db.collection(`${collectionName}`);
  const document = collection.doc(`${documentName}`);
  await document.delete();
}

export async function getAllDocumentsinCollection({
  collectionName,
  documentName,
  subCollectionName,
}: {
  collectionName: string;
  documentName?: string;
  subCollectionName?: string;
}): Promise<Array<{ [fieldPath: string]: any }> | false> {
  const collection = subCollectionName
    ? db
        .collection(`${collectionName}`)
        .doc(`${documentName}`)
        .collection(`${subCollectionName}`)
    : db.collection(`${collectionName}`);
  const snapshot = await collection.get();
  const documents = [];
  snapshot.forEach((doc) => documents.push(doc.data()));
  return documents;
}

export async function getSpecificDocuments({
  collectionName,
  field,
  key,
}: {
  collectionName: string;
  field: string;
  key: any;
}): Promise<Array<{ [fieldPath: string]: any }> | false> {
  const collection = db.collection(`${collectionName}`);
  const snapshot = await collection.where(`${field}`, '==', `${key}`).get();
  const documents = [];
  snapshot.forEach((doc) => documents.push(doc.data()));
  return snapshot.size ? documents : false;
}
