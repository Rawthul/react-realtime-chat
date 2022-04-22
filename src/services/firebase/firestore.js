import {
	getFirestore,
	collection,
	doc as document,
	query,
	onSnapshot,
	serverTimestamp,
	orderBy,
	limit,
	addDoc as add,
	getDocs as getMultiple,
	getDoc as getSingle,
} from 'firebase/firestore';

import { app } from './app';

export const db = getFirestore(app);

export const addDoc = (path, data) =>
	add(collection(db, path), { ...data, timestamp: serverTimestamp() });

export const getDocs = (path) => getMultiple(collection(db, path));

export const getDoc = (coll, doc) => getSingle(document(db, coll, doc));

export const loadDocs = (path, cstr, callback) => {
	const docData = collection(db, path);
	const orderQuery = cstr?.field ? orderBy(cstr.field, cstr.direction) : null;
	const limitQuery = cstr?.limit ? limit(cstr.limit) : null;
	const constraints = [orderQuery, limitQuery].filter(Boolean);
	const recentDocsQuery = query(docData, ...constraints);
	onSnapshot(recentDocsQuery, callback);
};