import { db, storage } from './config';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Group } from './types';

// Create a new group
export async function createGroup(name: string, userId: string) {
  const groupRef = await addDoc(collection(db, 'groups'), {
    name,
    createdAt: new Date(),
    createdBy: userId
  });
  
  // Use the document ID as the invitation code
  const groupData = {
    name,
    invitationCode: groupRef.id,
    createdAt: new Date(),
    createdBy: userId
  };
  
  // Update the document with its own ID as the invitation code
  await updateDoc(groupRef, { invitationCode: groupRef.id });
  
  // Add creator as first member
  await addDoc(collection(db, 'groupMembers'), {
    groupId: groupRef.id,
    userId,
    joinedAt: new Date()
  });
  
  return { ...groupData, id: groupRef.id };
}

// Join a group using invitation code
export async function joinGroup(invitationCode: string, userId: string) {
  const groupsRef = collection(db, 'groups');
  const q = query(groupsRef, where('invitationCode', '==', invitationCode));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    throw new Error('Invalid invitation code');
  }
  
  const group = querySnapshot.docs[0];
  
  // Check if user is already a member
  const membersRef = collection(db, 'groupMembers');
  const memberQuery = query(
    membersRef, 
    where('groupId', '==', group.id),
    where('userId', '==', userId)
  );
  const memberSnapshot = await getDocs(memberQuery);
  
  if (!memberSnapshot.empty) {
    throw new Error('You are already a member of this group');
  }
  
  // Add user to group
  await addDoc(collection(db, 'groupMembers'), {
    groupId: group.id,
    userId,
    joinedAt: new Date()
  });
  
  return { ...group.data(), id: group.id };
}

// Get user's groups
export async function getUserGroups(userId: string): Promise<Group[]> {
  const membersRef = collection(db, 'groupMembers');
  const q = query(membersRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  const groups = await Promise.all(
    querySnapshot.docs.map(async (memberDoc) => {
      const groupDoc = await getDoc(doc(db, 'groups', memberDoc.data().groupId));
      return { ...groupDoc.data(), id: groupDoc.id } as Group;
    })
  );
  
  return groups;
}

// Upload photo to group
export async function uploadGroupPhoto(
  groupId: string,
  userId: string,
  file: File
) {
  // Check if user is member of group
  const membersRef = collection(db, 'groupMembers');
  const memberQuery = query(
    membersRef,
    where('groupId', '==', groupId),
    where('userId', '==', userId)
  );
  const memberSnapshot = await getDocs(memberQuery);
  
  if (memberSnapshot.empty) {
    throw new Error('You are not a member of this group');
  }
  
  // Upload file to Firebase Storage
  const storageRef = ref(storage, `groups/${groupId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);
  
  // Save photo metadata to Firestore
  const photoData = {
    groupId,
    uploadedBy: userId,
    uploadedAt: new Date(),
    fileName: file.name,
    storageUrl: downloadUrl
  };
  
  const photoRef = await addDoc(collection(db, 'groupPhotos'), photoData);
  return { ...photoData, id: photoRef.id };
}

// Get group photos
export async function getGroupPhotos(groupId: string, userId: string) {
  // Check if user is member of group
  const membersRef = collection(db, 'groupMembers');
  const memberQuery = query(
    membersRef,
    where('groupId', '==', groupId),
    where('userId', '==', userId)
  );
  const memberSnapshot = await getDocs(memberQuery);
  
  if (memberSnapshot.empty) {
    throw new Error('You are not a member of this group');
  }
  
  // Get group photos
  const photosRef = collection(db, 'groupPhotos');
  const q = query(photosRef, where('groupId', '==', groupId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
} 