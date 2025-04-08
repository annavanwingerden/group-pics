'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../firebase/auth';
import { getUserGroups, createGroup, joinGroup } from '@/app/firebase/groupUtils';
import { Group } from '@/app/firebase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function GroupsPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGroups = useCallback(async () => {
    if (!user) return;
    try {
      const userGroups = await getUserGroups(user.uid);
      setGroups(userGroups);
    } catch {
      setError('Failed to load groups');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadGroups();
    }
  }, [user, loadGroups]);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await createGroup(newGroupName, user.uid);
      setNewGroupName('');
      loadGroups();
    } catch {
      setError('Failed to create group');
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await joinGroup(invitationCode, user.uid);
      setInvitationCode('');
      loadGroups();
    } catch {
      setError('Failed to join group');
    }
  };

  if (!user) {
    return <div>Please sign in to view groups</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Groups</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <Input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              required
            />
            <Button type="submit">Create Group</Button>
          </form>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Join Group</h2>
          <form onSubmit={handleJoinGroup} className="space-y-4">
            <Input
              type="text"
              placeholder="Invitation Code"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              required
            />
            <Button type="submit">Join Group</Button>
          </form>
        </div>
      </div>

      {error && (
        <div className="text-red-500 mt-4">{error}</div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/groups/${group.id}`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-500">
                Invitation Code: {group.invitationCode}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 