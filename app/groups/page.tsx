'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../firebase/auth';
import { getUserGroups, createGroup, joinGroup } from '@/app/firebase/groupUtils';
import { Group } from '@/app/firebase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function GroupsPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Groups</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push(`/groups/${group.id}`)}
          >
            <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Created {new Date(group.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <Input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Group Name"
              required
            />
            <Button type="submit" className="w-full">
              Create Group
            </Button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Join Existing Group</h2>
          <form onSubmit={handleJoinGroup} className="space-y-4">
            <Input
              type="text"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              placeholder="Invitation Code"
              required
            />
            <Button type="submit" className="w-full">
              Join Group
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 