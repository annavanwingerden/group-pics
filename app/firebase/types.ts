export interface Group {
  id: string;
  name: string;
  invitationCode: string;
  createdAt: Date;
  createdBy: string;
}

export interface GroupMember {
  groupId: string;
  userId: string;
  joinedAt: Date;
}

export interface GroupPhoto {
  id: string;
  groupId: string;
  uploadedBy: string;
  uploadedAt: Date;
  fileName: string;
  storageUrl: string;
} 